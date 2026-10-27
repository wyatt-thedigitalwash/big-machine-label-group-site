-- Record a mail-in entry (the Official Rules' alternate method of entry: a
-- 3" x 5" card with first and last name, email, date of birth and mailing
-- address). Run once per valid card in the Supabase SQL editor.
--
-- - created_at is the date the card was RECEIVED, so it falls inside the entry
--   period. Cards postmarked or received after the period are not entered.
-- - The email is folded the same way as online entries (lowercase, no "+tag",
--   no dots for Gmail), so a person who entered both online and by mail hits
--   the "one entry per person" rule: the insert fails with a duplicate error,
--   and the card is not entered.
-- - Mail-in entrants are never added to Mailchimp or Laylo (no opt-in).

with card as (
  select
    'First'::text                as first_name,
    'Last'::text                 as last_name,
    'name@example.com'::text     as email,
    '2000-01-31'::date           as birthdate,
    '123 Main St, Nashville, TN 37203'::text as mailing_address,
    '2026-11-10 12:00 America/Chicago'::timestamptz as received_at
),
folded as (
  select card.*,
    lower(split_part(email, '@', 2)) as domain,
    split_part(split_part(lower(email), '@', 1), '+', 1) as local
  from card
)
insert into public.giveaway_entries (
  campaign, source, first_name, last_name, email, email_normalized, birthdate,
  mailing_address, created_at, rules_accepted_at
)
select
  'alabama-vs-tennessee', 'mail', first_name, last_name, lower(email),
  case when domain in ('gmail.com', 'googlemail.com')
       then replace(local, '.', '') || '@gmail.com'
       else local || '@' || domain end,
  birthdate, mailing_address, received_at, received_at
from folded
returning id, first_name, last_name, email, created_at;
