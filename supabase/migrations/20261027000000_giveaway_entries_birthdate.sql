-- The Official Rules collect each entrant's birthdate on the entry form.
alter table public.giveaway_entries add column if not exists birthdate date;
