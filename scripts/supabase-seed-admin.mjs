#!/usr/bin/env node
/**
 * Seed (or re-seed) the AHV administrator identity in Supabase.
 *
 * Creates the Supabase Auth user when missing, ensures a matching
 * public.admin_users row exists, and can rotate the password of an existing
 * administrator.
 *
 * Usage:
 *   node scripts/supabase-seed-admin.mjs [email] [password]
 *
 * Environment (required):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Example:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=... \
 *   node scripts/supabase-seed-admin.mjs admin@africanhiddenvoices.co.za AHV-Admin-2026
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

const email = (process.argv[2] ?? "admin@africanhiddenvoices.co.za")
  .trim()
  .toLowerCase();
const password = process.argv[3] ?? "AHV-Admin-2026";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment.",
  );
  process.exit(1);
}

if (password.length < 6) {
  console.error("Password must be at least six characters.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  // 1. Find or create the Supabase Auth user.
  let userId;
  const { data: listData } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  const existing = listData?.users.find((u) => u.email === email);

  if (existing) {
    userId = existing.id;
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });
    if (error) {
      console.error("Could not rotate the password:", error.message);
      process.exit(1);
    }
    console.log(`Updated existing Supabase Auth user ${email} (${userId}).`);
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error || !data.user) {
      console.error("Could not create the Supabase Auth user:", error?.message);
      process.exit(1);
    }
    userId = data.user.id;
    console.log(`Created Supabase Auth user ${email} (${userId}).`);
  }

  // 2. Ensure the admin_users row exists.
  const { error: upsertError } = await supabase.from("admin_users").upsert(
    {
      id: userId,
      email,
      session_version: 1,
    },
    { onConflict: "id" },
  );
  if (upsertError) {
    console.error(
      "Could not upsert the admin_users row (did you run supabase/migrations/0001_admin_media.sql?):",
      upsertError.message,
    );
    process.exit(1);
  }

  console.log(`admin_users row ready for ${email}.`);
  console.log("The administration desk at /admin can now sign in with these details.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
