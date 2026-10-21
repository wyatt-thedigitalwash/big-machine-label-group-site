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
