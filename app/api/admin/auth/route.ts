import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getAdminCredentials,
  getAdminSession,
  saveAdminCredentials,
  verifyCredentials,
} from "@/lib/admin-auth";

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({
    ok: true,
    authenticated: session.authenticated,
    email: session.email,
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
      const email = String(body.email ?? "");
      const password = String(body.password ?? "");

      if (!verifyCredentials(email, password)) {
        return NextResponse.json(
          {
            ok: false,
            error: "Invalid administrator email or password.",
          },
          { status: 401 },
        );
      }

      const current = getAdminCredentials();
      const token = createSessionToken(current.email, current.password);
      const response = NextResponse.json({
        ok: true,
        authenticated: true,
        email: current.email,
      });

      response.cookies.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    if (body.action === "logout") {
      const response = NextResponse.json({ ok: true, authenticated: false });
      response.cookies.set(ADMIN_COOKIE_NAME, "", {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
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

      const current = getAdminCredentials();
      if (body.currentPassword !== current.password) {
        return NextResponse.json(
          { ok: false, error: "Current password does not match." },
          { status: 400 },
        );
      }

      const newEmail = String(body.newEmail ?? current.email).trim();
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

      saveAdminCredentials(newEmail, newPassword);
      const token = createSessionToken(newEmail, newPassword);
      const response = NextResponse.json({
        ok: true,
        authenticated: true,
        email: newEmail,
      });

      response.cookies.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

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
