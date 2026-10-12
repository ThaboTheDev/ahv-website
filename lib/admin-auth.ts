/**
 * Authentication and session management for the AHV Editorial & Research
 * Administration Desk (/admin).
 */

import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "ahv_admin_session";

export const DEFAULT_ADMIN_EMAIL =
  process.env.AHV_ADMIN_EMAIL ?? "admin@africanhiddenvoices.co.za";
export const DEFAULT_ADMIN_PASSWORD =
  process.env.AHV_ADMIN_PASSWORD ?? "AHV-Admin-2026";

const AUTH_FILE_PATH = resolve(process.cwd(), "data/admin-auth.json");
const SESSION_SECRET =
  process.env.AHV_SESSION_SECRET ??
  "ahv-research-institution-editorial-desk-secret-2026";

interface StoredCredentials {
  email: string;
  password: string;
  updatedAt: string;
}

export function getAdminCredentials(): { email: string; password: string } {
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

export function saveAdminCredentials(email: string, password: string): void {
  const payload: StoredCredentials = {
    email: email.trim().toLowerCase(),
    password,
    updatedAt: new Date().toISOString(),
  };
  mkdirSync(dirname(AUTH_FILE_PATH), { recursive: true });
  writeFileSync(AUTH_FILE_PATH, JSON.stringify(payload, null, 2), "utf8");
}

function signToken(email: string, password: string): string {
  const normalized = `${email.trim().toLowerCase()}:${password}`;
  const mac = createHmac("sha256", SESSION_SECRET)
    .update(normalized)
    .digest("hex");
  const encodedEmail = Buffer.from(email.trim().toLowerCase(), "utf8").toString(
    "base64url",
  );
  return `${encodedEmail}.${mac}`;
}

export function createSessionToken(email: string, password: string): string {
  return signToken(email, password);
}

export function verifyCredentials(email: string, password: string): boolean {
  const current = getAdminCredentials();
  const emailMatches =
    email.trim().toLowerCase() === current.email.trim().toLowerCase();
  const passwordMatches = password === current.password;
  return emailMatches && passwordMatches;
}

export function verifySessionToken(token: string | undefined): {
  authenticated: boolean;
  email?: string;
} {
  if (!token || !token.includes(".")) {
    return { authenticated: false };
  }
  const current = getAdminCredentials();
  const expected = signToken(current.email, current.password);

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    return { authenticated: false };
  }
  if (!timingSafeEqual(a, b)) {
    return { authenticated: false };
  }
  return { authenticated: true, email: current.email };
}

export async function getAdminSession(): Promise<{
  authenticated: boolean;
  email: string;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const result = verifySessionToken(token);
  const current = getAdminCredentials();
  return {
    authenticated: result.authenticated,
    email: result.email ?? current.email,
  };
}
