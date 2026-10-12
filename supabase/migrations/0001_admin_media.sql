-- ============================================================
-- AHV administration desk: admin identities and media storage
-- Run in the Supabase SQL editor, or with the Supabase CLI:
--   supabase db push
-- ============================================================

-- 1. Administrator identities ---------------------------------
-- One row per authorised editor. A Supabase Auth user only gains
-- access to the desk when a row exists here.

create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  -- Bumped whenever credentials change; signed session cookies carry the
  -- current value, so every older cookie stops working immediately.
  session_version integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Administrators may read their own row. Nobody but the service role
-- (server code) can insert, update or delete rows.
create policy "Admins read own row"
  on public.admin_users
  for select
  to authenticated
  using (auth.uid() = id);

-- 2. Media storage bucket -------------------------------------
-- Public read (images are shown on the public website), writes only
-- through the service role after the desk has verified the session.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760, -- 10 MB
  array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml','image/avif']
)
on conflict (id) do nothing;

-- Public read access for every image in the bucket.
create policy "Public reads media"
  on storage.objects
  for select
  using (bucket_id = 'media');

-- The desk uploads through the service role, which bypasses RLS.
-- These policies additionally allow a signed-in administrator to manage
-- media with their own JWT, and block every other role.
create policy "Admins upload media"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'media'
    and exists (
      select 1 from public.admin_users a where a.id = auth.uid()
    )
  );

create policy "Admins update media"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'media'
    and exists (
      select 1 from public.admin_users a where a.id = auth.uid()
    )
  );

create policy "Admins delete media"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'media'
    and exists (
      select 1 from public.admin_users a where a.id = auth.uid()
    )
  );

-- 3. Notes ----------------------------------------------------
-- * auth.users holds the email and password (hashed by Supabase Auth).
--   Create the first administrator with scripts/supabase-seed-admin.mjs
--   or the Supabase dashboard (Authentication > Users > Add user), then
--   make sure a matching public.admin_users row exists (the seed script
--   does both).
-- * The desk's content store (data/cms-store.json) is unchanged; only
--   logins and uploaded images live in Supabase.
