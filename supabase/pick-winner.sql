-- Run in the Supabase SQL editor to draw a random winner for a campaign.
-- Change the slug, run once, and record the result before re-running.
select id, first_name, last_name, email, phone_e164, team_pick, created_at
from public.giveaway_entries
where campaign = 'alabama-vs-tennessee'
order by random()
limit 1;
