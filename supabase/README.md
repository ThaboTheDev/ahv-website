# Supabase setup for the AHV administration desk

The `/admin` desk stores **administrator logins** in Supabase Auth and
**uploaded images** in Supabase Storage once the environment variables are
set. Without them the desk falls back to a local development store so the
website keeps working before the project is wired.

## 1. Create the project and run the migration

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run the contents of
   [`migrations/0001_admin_media.sql`](migrations/0001_admin_media.sql).
   It creates:
   - `public.admin_users` (row-level security enabled): one row per
     authorised editor. A Supabase Auth user has no access to the desk
     without a row here.
   - the public `media` Storage bucket (10 MB limit, images only) with
     policies: everyone may read, only administrators may write.

## 2. Configure the environment

Copy [`.env.example`](../.env.example) to `.env.local` and fill in:

| Variable | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard > Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Settings > API > `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings > API > `service_role` key (server only, never commit) |
| `AHV_SESSION_SECRET` | Any long random string (e.g. `openssl rand -hex 32`) |

## 3. Create the administrator identity

With the service role key in the environment:

```bash
node scripts/supabase-seed-admin.mjs admin@africanhiddenvoices.co.za AHV-Admin-2026
```

The script creates the Supabase Auth user (or rotates its password) and
ensures the matching `admin_users` row exists. Afterwards the desk signs in
at `/admin` with those details; **Administrator settings** in the desk
rotates the email and password, and every existing session cookie stops
working the moment the password changes (`session_version` bump).

## Security model

- The password is verified by Supabase Auth (hashed by GoTrue); the website
  never stores the password.
- The signed session cookie carries `user id + email + session_version`, is
  HMAC-signed with `AHV_SESSION_SECRET`, is HTTP-only, and expires after
  seven days.
- Every admin API call re-checks `admin_users`, so deleting a row revokes
  access immediately.
- Image uploads go through the service role **after** the session has been
  verified; RLS on `storage.objects` additionally blocks any direct write
  with the anon key.
- `data/admin-auth.json` (local fallback credentials) and `.env.local` are
  gitignored.
