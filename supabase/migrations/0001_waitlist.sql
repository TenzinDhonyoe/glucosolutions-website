-- Waitlist table for the GlucoSolutions marketing site.
-- Service role inserts only; no public read/write. RLS enabled with no policies.

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;
-- No policies are defined; only the service role key (which bypasses RLS)
-- can insert or read. This keeps emails private by default.
