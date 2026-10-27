-- Pre-drawing screen. Run in the Supabase SQL editor before picking a winner.
-- Scores each entry on signs of automation or one person entering many times.
-- A score of 0 means nothing stood out. Review anything above 0; a high score
-- is a reason to look closer, not automatic proof of cheating (families and
-- dorms legitimately share networks).
--
--   rapid_repeat     +3  another entry from the same IP within 5 seconds
--   disposable_email +3  throwaway email domain
--   same_device      +2  3+ entries with the same IP and the same browser
--   network_burst    +2  5+ entries from the same network within 10 minutes
--   phone_run        +2  3+ phone numbers that differ only in the last digit
--   email_pattern    +2  3+ emails on one domain, within an hour, that differ
--                        only by digits (jsmith1@, jsmith2@, jsmith3@)
--   busy_ip          +1  5+ entries from the same IP overall
--   repeated_name    +1  3+ entries with the same first and last name
--
-- Every count is a window function, so this finishes quickly on tens of
-- thousands of entries.

with e as (
  select *,
    case
      when ip_address ~ '^\d{1,3}(\.\d{1,3}){3}$' then regexp_replace(ip_address, '\.\d{1,3}$', '.0/24')
      else network_key
    end as network,
    lower(trim(first_name) || ' ' || trim(last_name)) as full_name,
    split_part(email_normalized, '@', 2) as domain,
    regexp_replace(split_part(email_normalized, '@', 1), '\d+', '', 'g') as email_stem,
    left(phone_e164, length(phone_e164) - 1) as phone_prefix
  from public.giveaway_entries
  where campaign = 'alabama-vs-tennessee'
),
w as (
  select e.*,
    lag(created_at)  over (partition by ip_address order by created_at) as prev_same_ip,
    lead(created_at) over (partition by ip_address order by created_at) as next_same_ip,
    count(*) over (partition by ip_address, user_agent) as same_device_n,
    count(*) over (partition by network order by created_at
                   range between interval '10 minutes' preceding and interval '10 minutes' following) as burst_n,
    count(*) over (partition by ip_address) as ip_n,
    count(*) over (partition by full_name) as name_n,
    count(*) over (partition by phone_prefix) as phone_run_n,
    count(*) filter (where split_part(email_normalized, '@', 1) ~ '\d')
      over (partition by domain, email_stem order by created_at
            range between interval '60 minutes' preceding and interval '60 minutes' following) as stem_digit_n
  from e
),
signals as (
  select w.*,
    ip_address is not null and (
      created_at - prev_same_ip <= interval '5 seconds'
      or next_same_ip - created_at <= interval '5 seconds'
    ) as rapid_repeat,
    domain in (
      'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', 'grr.la',
      '10minutemail.com', 'temp-mail.org', 'tempmail.com', 'yopmail.com', 'getnada.com',
      'dispostable.com', 'maildrop.cc', 'trashmail.com', 'throwawaymail.com', 'fakeinbox.com',
      'mintemail.com', 'mohmal.com', 'emailondeck.com', 'burnermail.io', 'tempmailo.com'
    ) as disposable_email,
    ip_address is not null and same_device_n >= 3 as same_device,
    network is not null and burst_n >= 5 as network_burst,
    phone_prefix is not null and phone_run_n >= 3 as phone_run,
    email_stem <> '' and stem_digit_n >= 3 and split_part(email_normalized, '@', 1) ~ '\d' as email_pattern,
    ip_address is not null and ip_n >= 5 as busy_ip,
    name_n >= 3 as repeated_name
  from w
)
select
  (case when rapid_repeat then 3 else 0 end)
  + (case when disposable_email then 3 else 0 end)
  + (case when same_device then 2 else 0 end)
  + (case when network_burst then 2 else 0 end)
  + (case when phone_run then 2 else 0 end)
  + (case when email_pattern then 2 else 0 end)
  + (case when busy_ip then 1 else 0 end)
  + (case when repeated_name then 1 else 0 end) as risk_score,
  array_remove(array[
    case when rapid_repeat then 'rapid_repeat' end,
    case when disposable_email then 'disposable_email' end,
    case when same_device then 'same_device' end,
    case when network_burst then 'network_burst' end,
    case when phone_run then 'phone_run' end,
    case when email_pattern then 'email_pattern' end,
    case when busy_ip then 'busy_ip' end,
    case when repeated_name then 'repeated_name' end
  ], null) as flags,
  id, source, created_at, first_name, last_name, email, phone_e164, team_pick, ip_address, user_agent
from signals
order by risk_score desc, created_at;
