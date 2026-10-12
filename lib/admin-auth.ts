/**
 * Authentication and session management for the AHV Editorial & Research
 * Administration Desk (/admin).
 *
 * Two modes:
 *
 * 1. Supabase mode (when NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 *    and SUPABASE_SERVICE_ROLE_KEY are set): the password is verified against
 *    Supabase Auth, access is gated by the admin_users table, and the signed
 *    session cookie carries the row's session_version so a password change or
 *    a revocation invalidates every existing session immediately.
 *
 * 2. Local development fallback (no Supabase envs): credentials live in
 *    data/admin-auth.json and sessions are signed the same way. This exists so
 *    the desk keeps working before the Supabase project is wired; it is not a
 *    production configuration.
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { cookies } from "next/headers";
import {
  getAdminRow,
  isSupabaseConfigured,
  verifySupabaseCredentials,
} from "@/lib/supabase";

export const ADMIN_COOKIE_NAME = "ahv_admin_session";

export const DEFAULT_ADMIN_EMAIL =
  process.env.AHV_ADMIN_EMAIL ?? "admin@africanhiddenvoices.co.za";
export const DEFAULT_ADMIN_PASSWORD =
  process.env.AHV_ADMIN_PASSWORD ?? "AHV-Admin-2026";

const AUTH_FILE_PATH = resolve(process.cwd(), "data/admin-auth.json");
const SESSION_SECRET =
  process.env.AHV_SESSION_SECRET ??
  "ahv-research-institution-editorial-desk-secret-2026";

export type AuthMode = "supabase" | "local";

export interface AdminSession {
  authenticated: boolean;
  email: string;
  mode: AuthMode;
  /** Supabase Auth user id when in supabase mode. */
  userId?: string;
}

interface SessionClaims {
  uid: string;
  email: string;
  version: number;
}

interface StoredCredentials {
  email: string;
  password: string;
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Local fallback credentials                                         */
/* ------------------------------------------------------------------ */

function getLocalCredentials(): { email: string; password: string } {
  if (existsSync(AUTH_FILE_PATH)) {
    try {
      const parsed = JSON.parse(
        readFileSync(AUTH_FILE_PATH, "utf8"),
      ) as Partial<StoredCredentials>;
      if (parsed.email && parsed.password) {
        return { email: parsed.email, password: parsed.password };
      }
    } catch {
      // Fall back to default credentials if the file cannot be read.
    }
  }
  return {
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
  };
}

function saveLocalCredentials(email: string, password: string): void {
  const payload: StoredCredentials = {
    email: email.trim().toLowerCase(),
    password,
    updatedAt: new Date().toISOString(),
  };
  mkdirSync(dirname(AUTH_FILE_PATH), { recursive: true });
  writeFileSync(AUTH_FILE_PATH, JSON.stringify(payload, null, 2), "utf8");
}

/* ------------------------------------------------------------------ */
/* Signed session tokens                                              */
/* ------------------------------------------------------------------ */

function signClaims(claims: SessionClaims): string {
  const payload = Buffer.from(JSON.stringify(claims), "utf8").toString(
    "base64url",
  );
  const mac = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${mac}`;
}

function verifyClaims(token: string | undefined): SessionClaims | null {
  if (!token || !token.includes(".")) return null;
  const [payload, mac] = token.split(".");
  const expected = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");

  const a = Buffer.from(mac ?? "");
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const claims = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as SessionClaims;
    if (
      typeof claims.uid !== "string" ||
      typeof claims.email !== "string" ||
      typeof claims.version !== "number"
    ) {
      return null;
    }
    return claims;
  } catch {
    return null;
  }
}

/** Issue a session token. uid is the Supabase user id or "local". */
export function issueSessionToken(
  email: string,
  userId: string,
  version: number,
): string {
  return signClaims({
    uid: userId,
    email: email.trim().toLowerCase(),
    version,
  });
}

/* ------------------------------------------------------------------ */
/* Credential verification                                            */
/* ------------------------------------------------------------------ */

/**
 * Verify an email/password pair against the active auth backend and return the
 * claims a session cookie should carry. Returns null on failure.
 */
export async function authenticateAdministrator(
  email: string,
  password: string,
): Promise<{ token: string; email: string; userId: string } | null> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isSupabaseConfigured()) {
    const verified = await verifySupabaseCredentials(normalizedEmail, password);
    if (!verified) return null;

    const adminRow = await getAdminRow(verified.userId);
    if (!adminRow) return null;

    return {
      token: issueSessionToken(
        adminRow.email,
        verified.userId,
        adminRow.session_version,
      ),
      email: adminRow.email,
      userId: verified.userId,
    };
  }

  // Local fallback.
  const current = getLocalCredentials();
  const emailMatches = normalizedEmail === current.email.trim().toLowerCase();
  const passwordMatches = password === current.password;
  if (!emailMatches || !passwordMatches) return null;

  return {
    token: issueSessionToken(current.email, "local", 1),
    email: current.email.trim().toLowerCase(),
    userId: "local",
  };
}

export function verifyCredentials(email: string, password: string): boolean {
  const current = getLocalCredentials();
  const emailMatches =
    email.trim().toLowerCase() === current.email.trim().toLowerCase();
  return emailMatches && password === current.password;
}

export function saveLocalAdminCredentials(
  email: string,
  password: string,
): void {
  saveLocalCredentials(email, password);
}

/* ------------------------------------------------------------------ */
/* Session resolution                                                 */
/* ------------------------------------------------------------------ */

export async function resolveSessionToken(
  token: string | undefined,
): Promise<AdminSession> {
  const mode: AuthMode = isSupabaseConfigured() ? "supabase" : "local";
  const claims = verifyClaims(token);

  if (!claims) {
    return { authenticated: false, email: "", mode };
  }

  if (mode === "supabase") {
    if (claims.uid === "local") {
      return { authenticated: false, email: "", mode };
    }
    const adminRow = await getAdminRow(claims.uid);
    if (!adminRow || adminRow.session_version !== claims.version) {
      // Row removed (revoked) or credentials rotated (version bumped).
      return { authenticated: false, email: "", mode };
    }
    return {
      authenticated: true,
      email: adminRow.email,
      mode,
      userId: adminRow.id,
    };
  }

  if (claims.uid !== "local") {
    return { authenticated: false, email: "", mode };
  }
  return {
    authenticated: true,
    email: claims.email,
    mode,
    userId: "local",
  };
}

export async function getAdminSession(): Promise<AdminSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return resolveSessionToken(token);
}
