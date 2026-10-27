-- Riley Green's own Mailchimp audience as a third destination for opt-ins,
-- alongside Big Machine's Mailchimp and Big Machine's Laylo. It has its own
-- status, attempts, backoff and claim, like the other two, so it never holds
-- them back. Opt-ins queue for it even before its API key is configured; the
-- sync job delivers them once RILEY_MAILCHIMP_* is set in Vercel.

alter table public.giveaway_entries
  add column if not exists riley_mailchimp_status        text not null default 'none',
  add column if not exists riley_mailchimp_attempts      integer not null default 0,
  add column if not exists riley_mailchimp_synced_at     timestamptz,
  add column if not exists riley_mailchimp_error         text,
  add column if not exists riley_mailchimp_next_at       timestamptz,
  add column if not exists riley_mailchimp_claimed_until timestamptz;

do $$ begin
  alter table public.giveaway_entries add constraint giveaway_entries_riley_mailchimp_status_check
    check (riley_mailchimp_status in ('none', 'pending', 'synced', 'failed'));
exception when duplicate_object then null; end $$;

-- Every existing opt-in also goes to Riley's audience.
update public.giveaway_entries
   set riley_mailchimp_status = 'pending', riley_mailchimp_next_at = now()
 where marketing_opt_in and riley_mailchimp_status = 'none';

create index if not exists giveaway_entries_riley_mailchimp_queue_idx
  on public.giveaway_entries (riley_mailchimp_next_at) where riley_mailchimp_status = 'pending';

-- Claim and release for any of the three services. The service name is
-- checked against a fixed list before it is used as a column prefix.
create or replace function public.giveaway_sync_claim(
  p_service text, p_limit integer, p_lease_seconds integer, p_test_only boolean
)
returns setof public.giveaway_entries
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_service not in ('mailchimp', 'riley_mailchimp', 'laylo') then
    raise exception 'unknown service %', p_service;
  end if;
  return query execute format($q$
    update public.giveaway_entries e
       set %1$I = now() + make_interval(secs => $1)
     where e.id in (
       select id from public.giveaway_entries
        where %2$I = 'pending'
          and %3$I <= now()
          and (%1$I is null or %1$I < now())
          and (email::text like '%%@loadtest.invalid') = $2
        order by %3$I, created_at
        limit $3
        for update skip locked)
    returning e.*
  $q$, p_service || '_claimed_until', p_service || '_status', p_service || '_next_at')
  using p_lease_seconds, p_test_only, p_limit;
end;
$$;

create or replace function public.giveaway_sync_release(p_service text, p_ids uuid[])
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_service not in ('mailchimp', 'riley_mailchimp', 'laylo') then
    raise exception 'unknown service %', p_service;
  end if;
  execute format('update public.giveaway_entries set %I = null where id = any($1)', p_service || '_claimed_until')
  using p_ids;
end;
$$;

-- Entry insert: same as before, plus Riley's Mailchimp queue on opt-in.
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
  v_opt_in boolean := coalesce((p->>'marketing_opt_in')::boolean, false);
  v_queue text := case when coalesce((p->>'marketing_opt_in')::boolean, false) then 'pending' else 'none' end;
  v_due timestamptz := case when coalesce((p->>'marketing_opt_in')::boolean, false) then now() end;
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
    mailchimp_status, riley_mailchimp_status, laylo_status,
    mailchimp_next_at, riley_mailchimp_next_at, laylo_next_at,
    ip_address, network_key, user_agent,
    utm_source, utm_medium, utm_campaign, utm_content, referrer
  ) values (
    p->>'campaign', p->>'first_name', p->>'last_name', p->>'email', p->>'email_normalized',
    p->>'phone_e164', (p->>'birthdate')::date,
    p->>'team_pick', v_opt_in, v_opt_in, p->>'consent_text',
    v_queue, v_queue, v_queue,
    v_due, v_due, v_due,
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

revoke all on function public.giveaway_sync_claim(text, integer, integer, boolean) from public, anon, authenticated;
revoke all on function public.giveaway_sync_release(text, uuid[]) from public, anon, authenticated;
revoke all on function public.giveaway_submit_entry(jsonb, integer, integer) from public, anon, authenticated;
grant execute on function public.giveaway_sync_claim(text, integer, integer, boolean) to service_role;
grant execute on function public.giveaway_sync_release(text, uuid[]) to service_role;
grant execute on function public.giveaway_submit_entry(jsonb, integer, integer) to service_role;
