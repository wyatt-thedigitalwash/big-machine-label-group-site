import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description:
    "The latest news, releases, and announcements from Big Machine Records and its artists.",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
