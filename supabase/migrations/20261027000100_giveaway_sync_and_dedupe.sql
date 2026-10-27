-- Background sync of opted-in entries to Mailchimp and Laylo, plus duplicate
-- and per-network rules. The entry API only queues an opt-in; the sync job
-- (/api/giveaway/sync, run every minute by pg_cron) delivers it at the pace
-- each service allows and retries failures, recording the result per entry.

-- 1. Sync state, tracked separately for each service ---------------------------
alter table public.giveaway_entries
  add column if not exists email_normalized   text,
  add column if not exists mailchimp_status   text not null default 'none',
  add column if not exists laylo_status       text not null default 'none',
  add column if not exists mailchimp_attempts integer not null default 0,
  add column if not exists laylo_attempts     integer not null default 0,
  add column if not exists mailchimp_synced_at timestamptz,
  add column if not exists laylo_synced_at    timestamptz,
  add column if not exists mailchimp_error    text,
  add column if not exists laylo_error        text,
  add column if not exists next_sync_at       timestamptz,
  add column if not exists claimed_until      timestamptz;

do $$ begin
  alter table public.giveaway_entries add constraint giveaway_entries_mailchimp_status_check
    check (mailchimp_status in ('none', 'pending', 'synced', 'failed'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.giveaway_entries add constraint giveaway_entries_laylo_status_check
    check (laylo_status in ('none', 'pending', 'synced', 'failed'));
exception when duplicate_object then null; end $$;

create index if not exists giveaway_entries_sync_queue_idx
  on public.giveaway_entries (next_sync_at)
  where mailchimp_status = 'pending' or laylo_status = 'pending';

-- 2. One entry per person: normalized email and phone ---------------------------
-- email_normalized folds Gmail dots and "+tag" aliases so john+1@gmail.com and
-- j.ohn@gmail.com count as the same person. The typed email is kept as-is.
update public.giveaway_entries set email_normalized = lower(email) where email_normalized is null;
alter table public.giveaway_entries alter column email_normalized set not null;

create unique index if not exists giveaway_entries_campaign_email_normalized_key
  on public.giveaway_entries (campaign, email_normalized);
create unique index if not exists giveaway_entries_campaign_phone_key
  on public.giveaway_entries (campaign, phone_e164);

-- 3. Per-network entry count (shared across all server instances) ---------------
create index if not exists giveaway_entries_campaign_ip_created_idx
  on public.giveaway_entries (campaign, ip_address, created_at desc);

create or replace function public.giveaway_entries_from_ip(p_campaign text, p_ip text, p_minutes integer)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::integer
  from public.giveaway_entries
  where campaign = p_campaign
    and ip_address = p_ip
    and created_at > now() - make_interval(mins => p_minutes);
$$;

-- 4. Single-runner lock so Laylo's pace holds across overlapping cron calls ------
create table if not exists public.giveaway_sync_lock (
  id integer primary key check (id = 1),
  locked_until timestamptz not null default 'epoch'
);
insert into public.giveaway_sync_lock (id) values (1) on conflict (id) do nothing;
alter table public.giveaway_sync_lock enable row level security;
revoke all on public.giveaway_sync_lock from anon, authenticated;

create or replace function public.giveaway_sync_try_lock(p_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.giveaway_sync_lock
     set locked_until = now() + make_interval(secs => p_seconds)
   where id = 1 and locked_until < now();
  return found;
end;
$$;

create or replace function public.giveaway_sync_unlock()
returns void
language sql
security definer
set search_path = public
as $$
  update public.giveaway_sync_lock set locked_until = 'epoch' where id = 1;
$$;

-- 5. Claim a batch of due entries. SKIP LOCKED plus a lease means two runs can
-- never work the same entry, and a crashed run's entries free up on their own.
create or replace function public.giveaway_sync_claim(p_limit integer, p_lease_seconds integer)
returns setof public.giveaway_entries
language sql
security definer
set search_path = public
as $$
  update public.giveaway_entries e
     set claimed_until = now() + make_interval(secs => p_lease_seconds)
   where e.id in (
     select id
       from public.giveaway_entries
      where (mailchimp_status = 'pending' or laylo_status = 'pending')
        and coalesce(next_sync_at, created_at) <= now()
        and (claimed_until is null or claimed_until < now())
      order by coalesce(next_sync_at, created_at), created_at
      limit p_limit
      for update skip locked
   )
  returning e.*;
$$;

-- Only the server (service role) may call these.
revoke all on function public.giveaway_entries_from_ip(text, text, integer) from public, anon, authenticated;
revoke all on function public.giveaway_sync_try_lock(integer) from public, anon, authenticated;
revoke all on function public.giveaway_sync_unlock() from public, anon, authenticated;
revoke all on function public.giveaway_sync_claim(integer, integer) from public, anon, authenticated;
grant execute on function public.giveaway_entries_from_ip(text, text, integer) to service_role;
grant execute on function public.giveaway_sync_try_lock(integer) to service_role;
grant execute on function public.giveaway_sync_unlock() to service_role;
grant execute on function public.giveaway_sync_claim(integer, integer) to service_role;
