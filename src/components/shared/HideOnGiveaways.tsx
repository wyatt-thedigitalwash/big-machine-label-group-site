"use client";

import { usePathname } from "next/navigation";

// Giveaway campaign pages are standalone landing pages. Site chrome passed
// through here is dropped on any /giveaways route (mode "all"), or only on the
// password gate page (mode "gate") for popups that should wait until a fan is
// actually on the campaign.
export default function HideOnGiveaways({
  children,
  mode = "all",
}: {
  children: React.ReactNode;
  mode?: "all" | "gate";
}) {
  const pathname = usePathname() ?? "";
  const hide = mode === "gate" ? pathname === "/giveaways/access" : pathname.startsWith("/giveaways");
  if (hide) return null;
  return <>{children}</>;
}
