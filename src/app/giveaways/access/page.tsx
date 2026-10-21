import type { Metadata } from "next";
import PasswordGate from "@/components/giveaway/PasswordGate";
import { CAMPAIGN } from "@/lib/giveaways/alabama-vs-tennessee";

// Link previews (iMessage, X, Facebook, Slack) fetch this page while the gate
// is on, so it carries the campaign's share card and copy. The password form
// itself is all a visitor sees.
export const metadata: Metadata = {
  title: "Alabama vs. Tennessee Giveaway",
  description:
    "Enter to win a football signed by Riley Green and Peyton Manning, in honor of the Alabama vs. Tennessee game and the song that goes with it. Pick a side. No purchase necessary.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Alabama vs. Tennessee Giveaway | Big Machine Records",
    description:
      "Enter to win a football signed by Riley Green and Peyton Manning. Pick a side. No purchase necessary.",
    url: `https://bigmachinerecords.com${CAMPAIGN.path}`,
    images: [{ url: CAMPAIGN.images.og, width: 1200, height: 630, alt: "Alabama vs. Tennessee giveaway. Riley Green featuring Peyton Manning." }],
  },
  twitter: { card: "summary_large_image", images: [CAMPAIGN.images.og] },
};

// Served in place of any giveaway route when the access cookie is missing
// (see src/proxy.ts). Also reachable directly at /giveaways/access.
export default function GiveawayAccessPage() {
  return (
    <div className="gv">
      <link rel="stylesheet" href="https://use.typekit.net/yoe5szg.css" precedence="default" />
      <PasswordGate />
    </div>
  );
}
