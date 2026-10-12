import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  authenticateAdministrator,
  getAdminSession,
  issueSessionToken,
  saveLocalAdminCredentials,
  verifyCredentials,
} from "@/lib/admin-auth";
import {
  getAdminRow,
  getServiceClient,
  isSupabaseConfigured,
  verifySupabaseCredentials,
} from "@/lib/supabase";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({
    ok: true,
    authenticated: session.authenticated,
    email: session.email,
    mode: session.mode,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      action: "login" | "logout" | "update_credentials";
      email?: string;
      password?: string;
      currentPassword?: string;
      newEmail?: string;
      newPassword?: string;
    };

    if (body.action === "login") {
      const result = await authenticateAdministrator(
        String(body.email ?? ""),
        String(body.password ?? ""),
      );

      if (!result) {
        return NextResponse.json(
          {
            ok: false,
            error: "Invalid administrator email or password.",
          },
          { status: 401 },
        );
      }

      const response = NextResponse.json({
        ok: true,
        authenticated: true,
        email: result.email,
        mode: isSupabaseConfigured() ? "supabase" : "local",
      });
      response.cookies.set(ADMIN_COOKIE_NAME, result.token, COOKIE_OPTIONS);
      return response;
    }

    if (body.action === "logout") {
      const response = NextResponse.json({ ok: true, authenticated: false });
      response.cookies.set(ADMIN_COOKIE_NAME, "", {
        ...COOKIE_OPTIONS,
        maxAge: 0,
      });
      return response;
    }

    if (body.action === "update_credentials") {
      const session = await getAdminSession();
      if (!session.authenticated) {
        return NextResponse.json(
          { ok: false, error: "Not authenticated." },
          { status: 401 },
        );
      }

      const newEmail = String(body.newEmail ?? session.email).trim();
      const newPassword = String(body.newPassword ?? "").trim();

      if (!newEmail || newPassword.length < 6) {
        return NextResponse.json(
          {
            ok: false,
            error:
              "Please provide a valid email and a password of at least six characters.",
          },
          { status: 400 },
        );
      }

      if (isSupabaseConfigured() && session.userId) {
        // Confirm the current password against Supabase Auth first.
        const confirmed = await verifySupabaseCredentials(
          session.email,
          String(body.currentPassword ?? ""),
        );
        if (!confirmed || confirmed.userId !== session.userId) {
          return NextResponse.json(
            { ok: false, error: "Current password does not match." },
            { status: 400 },
          );
        }

        // Rotate credentials in Supabase Auth and bump session_version so
        // every previously issued cookie stops working immediately.
        const { error: updateError } = await getServiceClient()
          .auth.admin.updateUserById(session.userId, {
            email: newEmail.toLowerCase(),
            password: newPassword,
            email_confirm: true,
          });
        if (updateError) {
          return NextResponse.json(
            { ok: false, error: updateError.message },
            { status: 400 },
          );
        }

        const adminRow = await getAdminRow(session.userId);
        const nextVersion = (adminRow?.session_version ?? 1) + 1;
        const { error: rowError } = await getServiceClient()
          .from("admin_users")
          .update({ email: newEmail.toLowerCase(), session_version: nextVersion })
          .eq("id", session.userId);
        if (rowError) {
          return NextResponse.json(
            { ok: false, error: rowError.message },
            { status: 400 },
          );
        }

        const response = NextResponse.json({
          ok: true,
          authenticated: true,
          email: newEmail.toLowerCase(),
          mode: "supabase",
        });
        response.cookies.set(
          ADMIN_COOKIE_NAME,
          issueSessionToken(newEmail, session.userId, nextVersion),
          COOKIE_OPTIONS,
        );
        return response;
      }

      // Local fallback.
      if (
        !verifyCredentials(session.email, String(body.currentPassword ?? ""))
      ) {
        return NextResponse.json(
          { ok: false, error: "Current password does not match." },
          { status: 400 },
        );
      }
      saveLocalAdminCredentials(newEmail, newPassword);

      const response = NextResponse.json({
        ok: true,
        authenticated: true,
        email: newEmail.toLowerCase(),
        mode: "local",
      });
      response.cookies.set(
        ADMIN_COOKIE_NAME,
        issueSessionToken(newEmail, "local", 1),
        COOKIE_OPTIONS,
      );
      return response;
    }

    return NextResponse.json(
      { ok: false, error: "Unsupported auth action." },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Authentication failed.",
      },
      { status: 500 },
    );
  }
}
