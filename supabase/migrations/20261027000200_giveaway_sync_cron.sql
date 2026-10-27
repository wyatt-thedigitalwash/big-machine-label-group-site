-- Run the giveaway sync job every minute. pg_cron fires, pg_net calls the
-- site's /api/giveaway/sync endpoint, authenticated with the secret stored in
-- Supabase Vault as 'giveaway_sync_secret' (same value as GIVEAWAY_SYNC_SECRET
-- in Vercel). The secret itself is never written into this file.
--
-- Create or rotate the Vault secret separately:
--   select vault.create_secret('<secret>', 'giveaway_sync_secret');
-- Stop the job after the giveaway ends:
--   select cron.unschedule('giveaway-sync');

create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;

select cron.schedule(
  'giveaway-sync',
  '* * * * *',
  $job$
    select net.http_post(
      url := 'https://www.bigmachinerecords.com/api/giveaway/sync',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || (
          select decrypted_secret from vault.decrypted_secrets where name = 'giveaway_sync_secret'
        )
      ),
      body := '{}'::jsonb,
      timeout_milliseconds := 60000
    );
  $job$
);
