import { redirect } from "next/navigation";
import { CAMPAIGN } from "@/lib/giveaways/alabama-vs-tennessee";

// One live giveaway at a time. /giveaways forwards to it until there is more
// than one to list.
export default function GiveawaysIndex() {
  redirect(CAMPAIGN.path);
}
