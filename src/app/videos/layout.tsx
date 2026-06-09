import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch the latest music videos from Big Machine Records artists.",
};

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
