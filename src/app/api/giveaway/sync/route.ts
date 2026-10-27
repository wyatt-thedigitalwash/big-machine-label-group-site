import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { runGiveawaySync } from "@/lib/giveaways/sync";

// Called every minute by pg_cron in Supabase (see the giveaway_sync_cron
// migration). Authenticated with GIVEAWAY_SYNC_SECRET, which must match the
// secret stored in Supabase Vault. Not behind the giveaway password gate.
export const maxDuration = 120; // the sync stops starting new work at 50s (lib/giveaways/sync)
export const dynamic = "force-dynamic";

function authorized(req: NextRequest, secret: string): boolean {
  const given = Buffer.from(req.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(req: NextRequest) {
  const secret = process.env.GIVEAWAY_SYNC_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Sync is not configured." }, { status: 503 });
  }
  if (!authorized(req, secret)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  // Simulated providers are available in development only, for testing the
  // queue without sending anything to Mailchimp or Laylo.
  const params = new URL(req.url).searchParams;
  const dryRun = process.env.NODE_ENV !== "production" && params.get("dryRun") === "1";
  const failRate = dryRun ? Math.min(1, Math.max(0, Number(params.get("fail")) || 0)) : 0;

  try {
    const summary = await runGiveawaySync({ dryRun, failRate });
    return NextResponse.json(summary);
  } catch (err) {
    console.error("[GiveawaySync] Run failed", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Sync run failed." }, { status: 500 });
  }
}
