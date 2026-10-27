-- Fans who opted in to marketing from Riley Green and Big Machine Records,
-- for import into Riley's Rivet account. Run in the Supabase SQL editor and
-- download the result as CSV. Only fans who ticked the opt-in box are
-- included; the consent text they agreed to names Riley Green, so this list
-- may be shared with his team. Never share entries without the opt-in.

select
  first_name,
  last_name,
  email,
  phone_e164 as phone,
  created_at at time zone 'America/New_York' as opted_in_at_et,
  team_pick
from public.giveaway_entries
where campaign = 'alabama-vs-tennessee'
  and marketing_opt_in
  and source = 'online'
  and email::text not like '%@loadtest.invalid'
order by created_at;
