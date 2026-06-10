import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description:
    "The latest news, tour announcements, and releases from Big Machine Records artists in Nashville, Tennessee.",
  openGraph: {
    title: "News | Big Machine Records",
    description:
      "The latest news, tour announcements, and releases from Big Machine Records artists in Nashville, Tennessee.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
