-- Giveaway / sweepstakes entries. One table serves every campaign; the
-- campaign slug scopes entries and the unique index enforces one entry per
-- email per campaign. Inserts only ever come from the Next.js API route using
-- the service role key, so RLS is on with no public policies.

create extension if not exists citext;

create table if not exists public.giveaway_entries (
  id                  uuid primary key default gen_random_uuid(),
  campaign            text not null,
  first_name          text not null,
  last_name           text not null,
  email               citext not null,
  phone_e164          text not null,
  team_pick           text check (team_pick in ('alabama', 'tennessee')),
  rules_accepted_at   timestamptz not null default now(),
  marketing_opt_in    boolean not null default false,
  sms_opt_in          boolean not null default false,
  consent_text        text,
  ip_address          text,
  user_agent          text,
  utm_source          text,
  utm_medium          text,
  utm_campaign        text,
  utm_content         text,
  referrer            text,
  created_at          timestamptz not null default now()
);

create unique index if not exists giveaway_entries_campaign_email_key
  on public.giveaway_entries (campaign, email);

create index if not exists giveaway_entries_campaign_created_idx
  on public.giveaway_entries (campaign, created_at desc);

alter table public.giveaway_entries enable row level security;

-- Belt and braces: the anon/authenticated API roles get nothing on this table.
revoke all on public.giveaway_entries from anon, authenticated;

-- Public-safe tally for the live "pick a side" bar. Exposes counts only.
create or replace function public.giveaway_team_tally(campaign_slug text)
returns table (team_pick text, entries bigint)
language sql
security definer
set search_path = public
stable
as $$
  select team_pick, count(*)::bigint
  from public.giveaway_entries
  where campaign = campaign_slug and team_pick is not null
  group by team_pick;
$$;

revoke all on function public.giveaway_team_tally(text) from public;
grant execute on function public.giveaway_team_tally(text) to anon, authenticated, service_role;
