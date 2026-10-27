-- Pre-launch hardening from the adversarial review.
--   1. Separate queue per service, so Laylo's slow pace never holds Mailchimp
--      back and one service's backoff never overwrites the other's.
--   2. Laylo email and phone tracked separately, so a temporary failure on one
--      half is retried without re-sending the half that already worked.
--   3. One-call entry insert that applies the per-network cap atomically and
--      names the duplicate (email or phone) from the constraint itself.
--   4. Mail-in entries (the Official Rules' alternate method of entry).
--   5. Lock with an owner, so a slow run can never release the next run's lock.
--   6. The tally is server-only.

-- 1 + 2. Per-service queue columns ------------------------------------------------
alter table public.giveaway_entries
  add column if not exists mailchimp_next_at       timestamptz,
  add column if not exists laylo_next_at           timestamptz,
  add column if not exists mailchimp_claimed_until timestamptz,
  add column if not exists laylo_claimed_until     timestamptz,
  add column if not exists laylo_email_result      text,
  add column if not exists laylo_phone_result      text,
  add column if not exists network_key             text,
  add column if not exists source                  text not null default 'online',
  add column if not exists mailing_address         text;

do $$ begin
  alter table public.giveaway_entries add constraint giveaway_entries_laylo_email_result_check
    check (laylo_email_result in ('ok', 'rejected'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.giveaway_entries add constraint giveaway_entries_laylo_phone_result_check
    check (laylo_phone_result in ('ok', 'rejected'));
exception when duplicate_object then null; end $$;

update public.giveaway_entries
   set mailchimp_next_at = coalesce(next_sync_at, created_at)
 where mailchimp_status = 'pending' and mailchimp_next_at is null;
update public.giveaway_entries
   set laylo_next_at = coalesce(next_sync_at, created_at)
 where laylo_status = 'pending' and laylo_next_at is null;
update public.giveaway_entries set network_key = ip_address where network_key is null;

drop function if exists public.giveaway_sync_claim(integer, integer);
drop index if exists public.giveaway_entries_sync_queue_idx;
alter table public.giveaway_entries
  drop column if exists next_sync_at,
  drop column if exists claimed_until;

create index if not exists giveaway_entries_mailchimp_queue_idx
  on public.giveaway_entries (mailchimp_next_at) where mailchimp_status = 'pending';
create index if not exists giveaway_entries_laylo_queue_idx
  on public.giveaway_entries (laylo_next_at) where laylo_status = 'pending';

-- Claim due entries for one service. SKIP LOCKED plus a lease means two runs
-- never work the same entry, and a crashed run's entries free up on their own.
-- Load-test rows (@loadtest.invalid) are only ever claimed by development dry
-- runs, and dry runs only ever claim those.
create or replace function public.giveaway_sync_claim(
  p_service text, p_limit integer, p_lease_seconds integer, p_test_only boolean
)
returns setof public.giveaway_entries
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_service = 'mailchimp' then
    return query
    update public.giveaway_entries e
       set mailchimp_claimed_until = now() + make_interval(secs => p_lease_seconds)
     where e.id in (
       select id from public.giveaway_entries
        where mailchimp_status = 'pending'
          and mailchimp_next_at <= now()
          and (mailchimp_claimed_until is null or mailchimp_claimed_until < now())
          and (email::text like '%@loadtest.invalid') = p_test_only
        order by mailchimp_next_at, created_at
        limit p_limit
        for update skip locked)
    returning e.*;
  elsif p_service = 'laylo' then
    return query
    update public.giveaway_entries e
       set laylo_claimed_until = now() + make_interval(secs => p_lease_seconds)
     where e.id in (
       select id from public.giveaway_entries
        where laylo_status = 'pending'
          and laylo_next_at <= now()
          and (laylo_claimed_until is null or laylo_claimed_until < now())
          and (email::text like '%@loadtest.invalid') = p_test_only
        order by laylo_next_at, created_at
        limit p_limit
        for update skip locked)
    returning e.*;
  else
    raise exception 'unknown service %', p_service;
  end if;
end;
$$;

-- Hand back claimed entries (ids travel in the body, not a URL).
create or replace function public.giveaway_sync_release(p_service text, p_ids uuid[])
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_service = 'mailchimp' then
    update public.giveaway_entries set mailchimp_claimed_until = null where id = any(p_ids);
  elsif p_service = 'laylo' then
    update public.giveaway_entries set laylo_claimed_until = null where id = any(p_ids);
  end if;
end;
$$;

-- 3. Entry insert with the per-network cap ------------------------------------------
drop function if exists public.giveaway_entries_from_ip(text, text, integer);
drop index if exists public.giveaway_entries_campaign_ip_created_idx;
create index if not exists giveaway_entries_campaign_network_created_idx
  on public.giveaway_entries (campaign, network_key, created_at desc);

-- Returns 'ok', 'network_limited', 'duplicate_email' or 'duplicate_phone'.
-- The advisory lock serializes entries from one network for the few
-- milliseconds of the count and insert, so parallel requests cannot overshoot
-- the cap. Entries from different networks never wait on each other.
create or replace function public.giveaway_submit_entry(
  p jsonb, p_network_max integer, p_network_minutes integer
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_constraint text;
begin
  if nullif(p->>'network_key', '') is not null then
    perform pg_advisory_xact_lock(hashtext('giveaway:' || (p->>'campaign') || ':' || (p->>'network_key')));
    if (select count(*) from public.giveaway_entries
         where campaign = p->>'campaign'
           and network_key = p->>'network_key'
           and created_at > now() - make_interval(mins => p_network_minutes)) >= p_network_max then
      return 'network_limited';
    end if;
  end if;

  insert into public.giveaway_entries (
    campaign, first_name, last_name, email, email_normalized, phone_e164, birthdate,
    team_pick, marketing_opt_in, sms_opt_in, consent_text,
    mailchimp_status, laylo_status, mailchimp_next_at, laylo_next_at,
    ip_address, network_key, user_agent,
    utm_source, utm_medium, utm_campaign, utm_content, referrer
  ) values (
    p->>'campaign', p->>'first_name', p->>'last_name', p->>'email', p->>'email_normalized',
    p->>'phone_e164', (p->>'birthdate')::date,
    p->>'team_pick', (p->>'marketing_opt_in')::boolean, (p->>'marketing_opt_in')::boolean,
    p->>'consent_text',
    case when (p->>'marketing_opt_in')::boolean then 'pending' else 'none' end,
    case when (p->>'marketing_opt_in')::boolean then 'pending' else 'none' end,
    case when (p->>'marketing_opt_in')::boolean then now() end,
    case when (p->>'marketing_opt_in')::boolean then now() end,
    nullif(p->>'ip_address', ''), nullif(p->>'network_key', ''), nullif(p->>'user_agent', ''),
    nullif(p->>'utm_source', ''), nullif(p->>'utm_medium', ''), nullif(p->>'utm_campaign', ''),
    nullif(p->>'utm_content', ''), nullif(p->>'referrer', '')
  );
  return 'ok';
exception when unique_violation then
  get stacked diagnostics v_constraint = constraint_name;
  if v_constraint = 'giveaway_entries_campaign_phone_key' then
    -- The same person resubmitting (same phone and same email) is "already
    -- entered", not a stranger's phone number.
    if exists (select 1 from public.giveaway_entries
                where campaign = p->>'campaign'
                  and phone_e164 = p->>'phone_e164'
                  and email_normalized = p->>'email_normalized') then
      return 'duplicate_email';
    end if;
    return 'duplicate_phone';
  end if;
  return 'duplicate_email';
end;
$$;

-- 4. Mail-in entries ----------------------------------------------------------------
-- Mail-in cards carry a mailing address and no phone number. They share the
-- email uniqueness rule with online entries (one entry per person, any method).
do $$ begin
  alter table public.giveaway_entries add constraint giveaway_entries_source_check
    check (source in ('online', 'mail'));
exception when duplicate_object then null; end $$;
alter table public.giveaway_entries alter column phone_e164 drop not null;
do $$ begin
  alter table public.giveaway_entries add constraint giveaway_entries_online_phone_check
    check (source = 'mail' or phone_e164 is not null);
exception when duplicate_object then null; end $$;

-- 5. Lock with an owner ---------------------------------------------------------------
alter table public.giveaway_sync_lock add column if not exists owner uuid;
drop function if exists public.giveaway_sync_try_lock(integer);
drop function if exists public.giveaway_sync_unlock();

create or replace function public.giveaway_sync_try_lock(p_seconds integer, p_owner uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.giveaway_sync_lock
     set locked_until = now() + make_interval(secs => p_seconds), owner = p_owner
   where id = 1 and locked_until < now();
  return found;
end;
$$;

create or replace function public.giveaway_sync_unlock(p_owner uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.giveaway_sync_lock set locked_until = 'epoch', owner = null
   where id = 1 and owner = p_owner;
$$;

-- 6. Grants -----------------------------------------------------------------------------
revoke all on function public.giveaway_sync_claim(text, integer, integer, boolean) from public, anon, authenticated;
revoke all on function public.giveaway_sync_release(text, uuid[]) from public, anon, authenticated;
revoke all on function public.giveaway_submit_entry(jsonb, integer, integer) from public, anon, authenticated;
revoke all on function public.giveaway_sync_try_lock(integer, uuid) from public, anon, authenticated;
revoke all on function public.giveaway_sync_unlock(uuid) from public, anon, authenticated;
grant execute on function public.giveaway_sync_claim(text, integer, integer, boolean) to service_role;
grant execute on function public.giveaway_sync_release(text, uuid[]) to service_role;
grant execute on function public.giveaway_submit_entry(jsonb, integer, integer) to service_role;
grant execute on function public.giveaway_sync_try_lock(integer, uuid) to service_role;
grant execute on function public.giveaway_sync_unlock(uuid) to service_role;

-- The site reads the tally with the service role; nobody else needs it, and a
-- public count over the whole table is an easy way to load the database.
revoke execute on function public.giveaway_team_tally(text) from anon, authenticated;
