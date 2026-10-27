import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { TeamPick } from "./alabama-vs-tennessee";

export type Tally = Record<TeamPick, number>;

export const EMPTY_TALLY: Tally = { alabama: 0, tennessee: 0 };

// Entry counts per side. Never throws: a tally failure must not take the
// page or the entry response down with it.
export async function getTeamTally(campaign: string): Promise<Tally> {
  try {
    const { data, error } = await getSupabaseAdmin().rpc("giveaway_team_tally", {
      campaign_slug: campaign,
    });
    if (error || !Array.isArray(data)) return EMPTY_TALLY;
    const tally: Tally = { ...EMPTY_TALLY };
    for (const row of data as { team_pick: string; entries: number }[]) {
      if (row.team_pick === "alabama" || row.team_pick === "tennessee") {
        tally[row.team_pick] = Number(row.entries) || 0;
      }
    }
    return tally;
  } catch {
    return EMPTY_TALLY;
  }
}

// Per-instance cache for the entry response, so a burst of entries shares one
// count every few seconds instead of running one per entry. `fetchedAt` lets
// the caller tell whether its own new entry is already included.
const TALLY_TTL_MS = 5_000;
let cached: { campaign: string; tally: Tally; fetchedAt: number } | null = null;
let inFlight: { promise: Promise<Tally>; startedAt: number } | null = null;

export async function getTeamTallyCached(campaign: string): Promise<{ tally: Tally; fetchedAt: number }> {
  if (cached && cached.campaign === campaign && Date.now() - cached.fetchedAt < TALLY_TTL_MS) {
    return { tally: cached.tally, fetchedAt: cached.fetchedAt };
  }
  if (!inFlight) {
    const startedAt = Date.now();
    const promise = getTeamTally(campaign).finally(() => {
      inFlight = null;
    });
    inFlight = { promise, startedAt };
  }
  const { promise, startedAt } = inFlight;
  const tally = await promise;
  cached = { campaign, tally, fetchedAt: startedAt };
  return { tally, fetchedAt: startedAt };
}
