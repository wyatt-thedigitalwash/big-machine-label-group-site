-- Delivery of opted-in giveaway entries to Big Machine's Mailchimp
-- (mailchimp_*), Riley Green's Mailchimp (riley_mailchimp_*) and Big Machine's
-- Laylo (laylo_*). Riley's entries stay pending until RILEY_MAILCHIMP_API_KEY
-- and RILEY_MAILCHIMP_AUDIENCE_ID are set in Vercel, then go out on their own.
-- Statuses: none (did not opt in), pending (queued or retrying), synced, failed.

-- 1. Overview by service.
select 'mailchimp' as service, mailchimp_status as status, count(*) as entries
from public.giveaway_entries where campaign = 'alabama-vs-tennessee' group by mailchimp_status
union all
select 'riley_mailchimp', riley_mailchimp_status, count(*)
from public.giveaway_entries where campaign = 'alabama-vs-tennessee' group by riley_mailchimp_status
union all
select 'laylo', laylo_status, count(*)
from public.giveaway_entries where campaign = 'alabama-vs-tennessee' group by laylo_status
order by service, status;

-- 2. Entries still retrying or permanently failed, with the last error.
-- Mailchimp: 'compliance' or 'invalid_email' are never retried. A synced row
-- noted 'member_unsubscribed' or 'member_cleaned' reached Mailchimp but stays
-- unsubscribed there, since Mailchimp forbids re-subscribing through the API.
-- Laylo: email and phone are tracked separately (laylo_email_result,
-- laylo_phone_result); 'rejected' means Laylo refused that identifier.
select created_at, email, mailchimp_status, mailchimp_attempts, mailchimp_error, mailchimp_next_at,
       laylo_status, laylo_attempts, laylo_error, laylo_email_result, laylo_phone_result, laylo_next_at
from public.giveaway_entries
where campaign = 'alabama-vs-tennessee'
  and (mailchimp_status in ('pending', 'failed') or laylo_status in ('pending', 'failed'))
order by created_at;

-- 3. Health check: how far behind each queue is. During a spike Laylo can be
-- a few hours behind (about 25 fans a minute); anything older than that, or a
-- Mailchimp backlog older than 30 minutes, means the job is not running.
-- Check query 4 for the reason.
select 'mailchimp' as service, count(*) as pending, min(created_at) as oldest,
       round(extract(epoch from now() - min(created_at)) / 60) as oldest_minutes
from public.giveaway_entries where mailchimp_status = 'pending'
union all
select 'riley_mailchimp', count(*), min(created_at), round(extract(epoch from now() - min(created_at)) / 60)
from public.giveaway_entries where riley_mailchimp_status = 'pending'
union all
select 'laylo', count(*), min(created_at), round(extract(epoch from now() - min(created_at)) / 60)
from public.giveaway_entries where laylo_status = 'pending';

-- 4. The last few scheduler calls and what the site answered. 200 is healthy;
-- 401 means the Vault secret and GIVEAWAY_SYNC_SECRET in Vercel differ; 503
-- means GIVEAWAY_SYNC_SECRET is missing in Vercel; 404 means not deployed.
-- pg_net keeps these for about 6 hours.
select created, status_code, left(content::text, 300) as response
from net._http_response
order by created desc
limit 10;

-- 5. Requeue failures after fixing their cause (for example an API key).
--    Uncomment and run the line for the service that needs it.
-- update public.giveaway_entries
--    set mailchimp_status = 'pending', mailchimp_attempts = 0, mailchimp_next_at = now()
--  where mailchimp_status = 'failed' and mailchimp_error not in ('compliance', 'invalid_email');
-- update public.giveaway_entries
--    set riley_mailchimp_status = 'pending', riley_mailchimp_attempts = 0, riley_mailchimp_next_at = now()
--  where riley_mailchimp_status = 'failed' and riley_mailchimp_error not in ('compliance', 'invalid_email');
-- update public.giveaway_entries
--    set laylo_status = 'pending', laylo_attempts = 0, laylo_next_at = now()
--  where laylo_status = 'failed' and laylo_error <> 'both_rejected';
