import Link from "next/link";
import { CAMPAIGN } from "@/lib/giveaways/alabama-vs-tennessee";

// Same background as the prize section above it, so top padding is dropped
// per the section spacing rule.
export default function RulesSummary() {
  return (
    <section className="w-full px-6 pt-0 pb-20 md:px-20 md:pb-28" aria-labelledby="rules-heading">
      <div className="max-w-[1200px] mx-auto border-t border-[var(--gv-cream)]/20 pt-12 md:pt-16">
        <h2 id="rules-heading" className="gv-head text-[26px] md:text-[36px] leading-[1.05]">
          No purchase necessary.
        </h2>
        {/* Plain-language summary only. The Official Rules page carries the
            client's approved text verbatim and controls in any conflict. */}
        <p className="gv-body text-[13px] md:text-[14px] leading-relaxed mt-6 max-w-[820px] text-[var(--gv-cream)]/80">
          Open to {CAMPAIGN.eligibility.residency} who are {CAMPAIGN.eligibility.ageText} at the
          time of entry. Entry period runs {CAMPAIGN.entryWindowDisplay}. One entry per
          person. One winner will be selected in a random drawing on or about {CAMPAIGN.drawingOn} and
          notified by email. Odds of winning depend on the number of eligible entries received. Prize
          approximate retail value: {CAMPAIGN.prize.arv}. A free alternative method of entry by mail is
          described in the Official Rules. Void where prohibited. Sponsor: {CAMPAIGN.sponsor.name},{" "}
          {CAMPAIGN.sponsor.address}. Promotional partner: Audacy, Inc. This sweepstakes is not
          sponsored, endorsed, administered by, or associated with Meta, Instagram, TikTok, X, the
          University of Alabama, the University of Tennessee, the Southeastern Conference, or the
          National Football League.
        </p>
        <Link
          href={CAMPAIGN.rulesPath}
          className="gv-sub inline-block mt-8 uppercase text-[13px] underline underline-offset-4 hover:text-[var(--gv-orange)] transition-colors duration-[400ms] ease-out"
        >
          Read the full Official Rules
        </Link>
      </div>
    </section>
  );
}
