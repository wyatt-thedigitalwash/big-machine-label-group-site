"use client";

import { usePathname } from "next/navigation";

// Giveaway campaign pages are standalone landing pages. Site chrome passed
// through here (currently the footer) is dropped on any /giveaways route.
export default function HideOnGiveaways({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/giveaways")) return null;
  return <>{children}</>;
}
