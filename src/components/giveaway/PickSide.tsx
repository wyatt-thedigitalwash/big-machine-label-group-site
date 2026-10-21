"use client";

import { useEffect, useRef, useState } from "react";
import { smoothScrollTo } from "@/lib/smooth-scroll";
import { TEAMS, type TeamPick } from "@/lib/giveaways/alabama-vs-tennessee";
import TeamTallyBar from "./TeamTallyBar";
import EntryForm from "./EntryForm";

type Tally = Record<TeamPick, number>;

interface Props {
  initialTally: Tally;
  entriesOpen: boolean;
}

const SIDES: TeamPick[] = ["alabama", "tennessee"];

export default function PickSide({ initialTally, entriesOpen }: Props) {
  const [side, setSide] = useState<TeamPick | null>(null);
  const [tally, setTally] = useState<Tally>(initialTally);
  const [entered, setEntered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Bring the form into view once a side is picked. The halves are still
  // collapsing at this point; the scroll re-reads the target each frame so it
  // settles exactly on the panel.
  useEffect(() => {
    if (!side || !panelRef.current) return;
    const el = panelRef.current;
    const id = window.setTimeout(() => smoothScrollTo(el, { duration: 1000, offset: 0 }), 80);
    return () => window.clearTimeout(id);
  }, [side]);

  const panelColor = side ? TEAMS[side].color : "var(--gv-charcoal)";

  return (
    <section id="enter" className="w-full scroll-mt-20" aria-labelledby="pick-side-heading">
      <div className="px-6 pt-16 pb-10 md:px-20 md:pt-24 md:pb-12 text-center">
        <p className="gv-sub uppercase text-[13px] md:text-[15px] text-[var(--gv-cream)]/80">
          Step one
        </p>
        <h2 id="pick-side-heading" className="gv-head text-[32px] md:text-[56px] leading-[1.02] mt-3">
          Pick a side.
        </h2>
        <p className="gv-body text-[14px] md:text-[16px] mt-4 max-w-[520px] mx-auto text-[var(--gv-cream)]/80">
          One football. Two signatures. Only one fanbase gets bragging rights when the drawing lands.
        </p>
      </div>

      {/* Two halves. The unpicked side collapses so the chosen color takes the
          full width (desktop) or full height (mobile). */}
      <div className="flex flex-col md:flex-row w-full" role="group" aria-label="Choose your team">
        {SIDES.map((team) => {
          const picked = side === team;
          const collapsed = side !== null && !picked;
          return (
            <button
              key={team}
              type="button"
              onClick={() => !entered && setSide(team)}
              disabled={entered}
              aria-pressed={picked}
              className={[
                "relative overflow-hidden text-[var(--gv-cream)] transition-all duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                "max-md:w-full md:min-h-[300px]",
                collapsed
                  ? "max-md:max-h-0 md:flex-[0_0_0%] opacity-0"
                  : "max-md:max-h-[300px] md:flex-1 opacity-100",
                entered ? "cursor-default" : "cursor-pointer",
              ].join(" ")}
              style={{ backgroundColor: TEAMS[team].color }}
            >
              <span className="flex flex-col items-center justify-center gap-3 py-16 md:py-24 px-6">
                <span className="gv-sub uppercase text-[40px] md:text-[72px] leading-none whitespace-nowrap">
                  {TEAMS[team].name}
                </span>
                <span className="gv-body uppercase tracking-[0.2em] text-[11px] md:text-[12px] opacity-80">
                  {picked ? "Your side" : "Tap to pick"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Form panel takes the picked team's color. */}
      <div
        ref={panelRef}
        className="w-full transition-colors duration-[800ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
        style={{ backgroundColor: panelColor }}
      >
        <div className="px-6 py-14 md:px-20 md:py-20 max-w-[1080px] mx-auto">
          {side === null ? (
            <div className="max-w-[640px] mx-auto">
              <p className="gv-body text-center text-[13px] md:text-[14px] mb-10 text-[var(--gv-cream)]/80">
                {entriesOpen
                  ? "Pick Alabama or Tennessee above to open the entry form."
                  : "This giveaway is not accepting entries right now."}
              </p>
              <TeamTallyBar tally={tally} />
            </div>
          ) : (
            <div key={side} className="grid grid-cols-1 md:grid-cols-[1fr_1fr] md:grid-rows-[auto_1fr] gap-10 md:gap-x-20 md:gap-y-12 items-start">
              <div className="gv-stagger md:col-start-1 md:row-start-1">
                <p className="gv-sub uppercase text-[13px] md:text-[15px] text-[var(--gv-cream)]/80">
                  Step two
                </p>
                <h3 className="gv-head text-[30px] md:text-[44px] leading-[1.02] mt-3 text-[var(--gv-cream)]">
                  {entered ? "You're in." : `Enter for ${TEAMS[side].name}.`}
                </h3>
                {!entered && (
                  <button
                    type="button"
                    onClick={() => setSide(side === "alabama" ? "tennessee" : "alabama")}
                    className="gv-body mt-4 text-[12px] underline underline-offset-4 text-[var(--gv-cream)]/80 hover:text-[var(--gv-cream)] transition-colors duration-[400ms]"
                  >
                    Wrong side? Switch to {TEAMS[side === "alabama" ? "tennessee" : "alabama"].name}
                  </button>
                )}
              </div>
              <div className="md:col-start-2 md:row-start-1 md:row-span-2">
                <EntryForm
                  team={side}
                  entriesOpen={entriesOpen}
                  onEntered={(nextTally) => {
                    if (nextTally) setTally(nextTally);
                    setEntered(true);
                  }}
                />
              </div>
              {/* Mobile: below the form. Desktop: under the heading in the left column. */}
              <div className="gv-rise-3 md:col-start-1 md:row-start-2">
                <TeamTallyBar tally={tally} highlight={side} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
