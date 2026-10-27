-- Draw the winner. Run in the Supabase SQL editor after the entry period
-- closes (November 13, 2026 at 12:00 p.m. ET) and all mail-in entries are loaded
-- (supabase/add-mail-in-entry.sql).
--
-- The draw is random but reproducible: entries are ordered by a hash of their
-- id and a seed. Pick the seed BEFORE the drawing (for example, write down a
-- phrase or the closing value of a public lottery) and record it together with
-- the eligible-entry count from step 2. Anyone re-running this with the same
-- seed gets the same order, so the draw can be verified and cannot quietly be
-- re-rolled.
--
-- 1. Run supabase/screen-entries.sql and review anything with a risk score
--    above 0. Put the ids of entries you disqualify in `disqualified` below.
-- 2. Set `launched_at` to the moment the page went public (the password gate
--    came off) so pre-launch test entries can never be drawn, and set `seed`.
--    The query fails until both placeholders are replaced.
-- 3. Run it. Rank 1 is the winner; ranks 2 and 3 are the alternates if the
--    winner is ineligible or does not reply within 48 hours (Official Rules).
--    Each entrant's age on their entry date and state of residence are still
--    verified with the affidavit (19+ in AL and NE, 21+ in MS).

with params as (
  select
    'REPLACE-WITH-LAUNCH-TIME, e.g. 2026-11-03 09:00 America/Chicago'::timestamptz as launched_at,
    'REPLACE-WITH-SEED'::text as seed
),
disqualified (id) as (
  values ('00000000-0000-0000-0000-000000000000'::uuid)  -- placeholder; add ids here
),
eligible as (
  select e.*
  from public.giveaway_entries e, params p
  where e.campaign = 'alabama-vs-tennessee'
    and e.created_at >= p.launched_at
    and e.created_at <= '2026-11-13 12:00:00 America/New_York'::timestamptz
    and e.birthdate is not null
    and e.birthdate <= (e.created_at at time zone 'America/Chicago')::date - interval '18 years'
    and e.id not in (select id from disqualified)
)
select
  row_number() over (order by md5(e.id::text || p.seed)) as rank,
  (select count(*) from eligible) as eligible_entries,
  e.id, e.source, e.first_name, e.last_name, e.email, e.phone_e164, e.mailing_address,
  e.birthdate, e.team_pick, e.created_at
from eligible e, params p
order by rank
limit 3;
