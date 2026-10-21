import { TEAMS, type TeamPick } from "@/lib/giveaways/alabama-vs-tennessee";

interface Props {
  tally: Record<TeamPick, number>;
  highlight?: TeamPick | null;
  onDark?: boolean;
}

// Red versus orange bar showing the entry split. Width is the share of all
// entries; a zero-entry campaign renders an even 50/50 so the bar never
// collapses to nothing. When the bar sits on a panel painted in the
// highlighted team's color, that team's segment switches to cream so it
// still reads against the matching background.
export default function TeamTallyBar({ tally, highlight = null, onDark = true }: Props) {
  const total = tally.alabama + tally.tennessee;
  const alabamaPct = total === 0 ? 50 : Math.round((tally.alabama / total) * 100);
  const tennesseePct = total === 0 ? 50 : 100 - alabamaPct;
  const text = onDark ? "var(--gv-cream)" : "var(--gv-charcoal)";
  const segmentColor = (team: TeamPick) =>
    highlight === team ? "var(--gv-cream)" : TEAMS[team].color;

  return (
    <div className="w-full" aria-label="Entry split between Alabama and Tennessee">
      <div className="flex justify-between items-end gap-4 mb-3">
        <TeamLabel team="alabama" pct={alabamaPct} active={highlight === "alabama"} color={text} />
        <TeamLabel
          team="tennessee"
          pct={tennesseePct}
          active={highlight === "tennessee"}
          color={text}
          right
        />
      </div>
      <div className="flex h-3 w-full overflow-hidden" role="img" aria-label={`Alabama ${alabamaPct} percent, Tennessee ${tennesseePct} percent`}>
        <div
          className="h-full transition-[width] duration-700 ease-out"
          style={{ width: `${alabamaPct}%`, backgroundColor: segmentColor("alabama") }}
        />
        <div
          className="h-full transition-[width] duration-700 ease-out"
          style={{ width: `${tennesseePct}%`, backgroundColor: segmentColor("tennessee") }}
        />
      </div>
      <p className="gv-body text-[11px] mt-3 text-center" style={{ color: text, opacity: 0.7 }}>
        {total === 0
          ? "Nobody has picked a side yet. Be the first."
          : `${total.toLocaleString()} ${total === 1 ? "fan has" : "fans have"} picked a side so far.`}
      </p>
    </div>
  );
}

function TeamLabel({
  team,
  pct,
  active,
  color,
  right = false,
}: {
  team: TeamPick;
  pct: number;
  active: boolean;
  color: string;
  right?: boolean;
}) {
  return (
    <div className={right ? "text-right" : "text-left"} style={{ color }}>
      <p className="gv-sub uppercase text-[13px] md:text-[15px]" style={{ opacity: active ? 1 : 0.8 }}>
        {TEAMS[team].name}
      </p>
      <p className="gv-head text-[22px] md:text-[28px] leading-none mt-1">{pct}%</p>
    </div>
  );
}
