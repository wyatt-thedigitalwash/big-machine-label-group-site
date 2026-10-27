import type { Metadata } from "next";
import LegalArticle from "@/components/legal/LegalArticle";
import { CAMPAIGN } from "@/lib/giveaways/alabama-vs-tennessee";
import { RULES_BLOCKS, RULES_TITLE } from "./content";

export const metadata: Metadata = {
  title: "Official Rules | Alabama vs. Tennessee Giveaway",
  description:
    "Official Rules for the Riley Green feat. Peyton Manning Alabama vs. Tennessee Sweepstakes from Big Machine Records.",
  alternates: { canonical: `https://bigmachinerecords.com${CAMPAIGN.rulesPath}` },
  robots: { index: false, follow: false, nocache: true },
};

// The rules text lives in ./content.ts, generated verbatim from the client's
// approved document. Nothing on this page rewrites or summarizes it.
export default function OfficialRulesPage() {
  return (
    <LegalArticle
      title={RULES_TITLE}
      blocks={RULES_BLOCKS}
      back={{ href: CAMPAIGN.path, label: "Back to the giveaway" }}
    />
  );
}
