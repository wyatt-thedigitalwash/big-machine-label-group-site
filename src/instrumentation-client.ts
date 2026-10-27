import { initBotId } from "botid/client/core";

// Vercel BotID: attaches an invisible browser check to giveaway entries. The
// matching server-side check is in src/app/api/giveaway/route.ts.
initBotId({
  protect: [{ path: "/api/giveaway", method: "POST" }],
});
