/**
 * Supabase connection layer for the AHV administration desk.
 *
 * When the Supabase environment variables are present, administrator sign-in
 * is verified against Supabase Auth (auth.users) and gatekept by the
 * admin_users table, and uploaded images are stored in the public "media"
 * Storage bucket. When they are absent the desk falls back to the local
 * development store so the site keeps working before the project is wired.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export type AdminUserRow = {
  id: string;
  email: string;
  session_version: number;
};

export function isSupabaseConfigured(): boolean {
  return Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_SERVICE_ROLE_KEY,
  );
}

let publicClient: SupabaseClient | null = null;
let serviceClient: SupabaseClient | null = null;

/** Client using the public anon key. Used to verify email/password sign-ins. */
export function getPublicClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  if (!publicClient) {
    publicClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return publicClient;
}

/**
 * Server-only client using the service role key. Never expose this to the
 * browser. Used for admin membership checks, credential updates and storage
 * writes after the requesting session has been verified.
 */
export function getServiceClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  if (!serviceClient) {
    serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return serviceClient;
}

/**
 * Look up the administrator row for a Supabase Auth user. RLS on admin_users
 * restricts reads to the row owner; the service role bypasses RLS and is only
 * reachable from server code.
 */
export async function getAdminRow(
  userId: string,
): Promise<AdminUserRow | null> {
  const { data, error } = await getServiceClient()
    .from("admin_users")
    .select("id, email, session_version")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return data as AdminUserRow;
}

/**
 * Verify an email/password pair against Supabase Auth. Returns the user id
 * when Supabase accepts the credentials.
 */
export async function verifySupabaseCredentials(
  email: string,
  password: string,
): Promise<{ userId: string } | null> {
  const { data, error } = await getPublicClient().auth.signInWithPassword({
    email,
    password,
  });
  if (error || !data.user) return null;
  return { userId: data.user.id };
}

export async function uploadMediaToSupabase(
  filename: string,
  bytes: Buffer,
  contentType: string,
): Promise<{ url: string } | { error: string }> {
  try {
    const client = getServiceClient();
    const path = `uploads/${filename}`;
    const { error } = await client.storage.from("media").upload(path, bytes, {
      contentType,
      upsert: false,
    });
    if (error) {
      return { error: error.message };
    }
    const {
      data: { publicUrl },
    } = client.storage.from("media").getPublicUrl(path);
    return { url: publicUrl };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Supabase upload failed.",
    };
  }
}

/** Delete an uploaded object. Used by maintenance tooling only. */
export async function deleteMediaFromSupabase(
  filename: string,
): Promise<boolean> {
  try {
    const { error } = await getServiceClient()
      .storage.from("media")
      .remove([`uploads/${filename}`]);
    return !error;
  } catch {
    return false;
  }
}
