import type { Metadata } from "next";

// Every giveaway route is a private preview until launch. The password gate
// itself runs in src/proxy.ts; this layout only keeps the routes out of search.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function GiveawaysLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
