-- Riley Green has no Mailchimp (his team uses Rivet), so opt-ins go only to
-- Big Machine's Mailchimp and Big Machine's Laylo. Entries stop queueing for
-- Riley's Mailchimp; the riley_mailchimp_* columns and the dormant sync lane
-- stay (the lane only runs when RILEY_MAILCHIMP_* is set, which it is not).
-- Riley's team gets opted-in fans as a CSV export instead
-- (supabase/export-opt-ins.sql), which the consent text covers since it
-- names Riley Green.

update public.giveaway_entries
   set riley_mailchimp_status = 'none', riley_mailchimp_next_at = null
 where riley_mailchimp_status = 'pending';

-- Entry insert: same as 20261027000400, minus the Riley Mailchimp queue.
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
    v_queue, 'none', v_queue,
    v_due, null, v_due,
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

revoke all on function public.giveaway_submit_entry(jsonb, integer, integer) from public, anon, authenticated;
grant execute on function public.giveaway_submit_entry(jsonb, integer, integer) to service_role;
