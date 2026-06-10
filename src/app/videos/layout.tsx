import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch official music videos and live performances from Big Machine Records artists in Nashville, Tennessee.",
  openGraph: {
    title: "Videos | Big Machine Records",
    description:
      "Watch official music videos and live performances from Big Machine Records artists in Nashville, Tennessee.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
