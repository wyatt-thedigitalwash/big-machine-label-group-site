import type { Metadata } from "next";
import GiveawayHero from "@/components/giveaway/GiveawayHero";
import PickSide from "@/components/giveaway/PickSide";
import PrizeSection from "@/components/giveaway/PrizeSection";
import RulesSummary from "@/components/giveaway/RulesSummary";
import { CAMPAIGN, isEntryWindowOpen } from "@/lib/giveaways/alabama-vs-tennessee";
import { getTeamTally } from "@/lib/giveaways/tally";

const BASE_URL = "https://bigmachinerecords.com";
const TITLE = "Alabama vs. Tennessee Giveaway";
const DESCRIPTION =
  "Enter to win a football signed by Riley Green and Peyton Manning, in honor of the Alabama vs. Tennessee game and the song that goes with it. Pick a side. No purchase necessary.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}${CAMPAIGN.path}` },
  openGraph: {
    title: `${TITLE} | Big Machine Records`,
    description: DESCRIPTION,
    url: `${BASE_URL}${CAMPAIGN.path}`,
    images: [{ url: CAMPAIGN.images.og, width: 1200, height: 630, alt: "Riley Green and Peyton Manning" }],
  },
  twitter: { card: "summary_large_image", images: [CAMPAIGN.images.og] },
  robots: { index: false, follow: false, nocache: true },
};

// The tally is read on each request so the split bar stays honest. Short
// cache keeps a traffic spike from hammering the database.
export const revalidate = 60;

export default async function AlabamaVsTennesseeGiveaway() {
  const tally = await getTeamTally(CAMPAIGN.slug);
  const entriesOpen = isEntryWindowOpen();

  return (
    <div className="gv">
      {/* Adobe Fonts kit for the campaign type. Loaded only on giveaway routes. */}
      <link rel="stylesheet" href="https://use.typekit.net/yoe5szg.css" precedence="default" />
      <GiveawayHero />
      <PickSide initialTally={tally} entriesOpen={entriesOpen} />
      <PrizeSection />
      <RulesSummary />
    </div>
  );
}
