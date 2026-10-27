import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasGiveawayAccess } from "@/lib/giveaways/access";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { validateGiveawayEntry } from "@/lib/giveaways/validation";
import { getTeamTallyCached } from "@/lib/giveaways/tally";
import {
  CAMPAIGN,
  isEntryWindowOpen,
  MARKETING_CONSENT_TEXT,
} from "@/lib/giveaways/alabama-vs-tennessee";

// Layered protection, cheapest first:
//   1. Flood guard: caps raw requests per IP on each server instance. Generous
//      on purpose, since campus, stadium and mobile-carrier networks put many
//      real fans behind one IP.
//   2. Honeypot field and campaign/window checks.
//   3. Vercel BotID: invisible check that the request came from a real browser.
//   4. Validation, then one database call that applies a per-network entry
//      cap (atomic, shared by every server instance) and inserts the entry.
//   5. Unique indexes: one entry per normalized email and per phone number.
// Entry counts per network are generous for the same reason as the flood
// guard; BotID and the pre-drawing screen (supabase/screen-entries.sql) are
// what catch automated entries.
const isFlooding = createRateLimiter(60, 60 * 1000);
const NETWORK_WINDOW_MINUTES = 10;
const NETWORK_MAX_ENTRIES = 300;

const GENERIC_ERROR = "Something went wrong. Please try again.";

// BotID only works on Vercel. Anywhere else (or if Vercel's check itself
// errors) it throws. By default the entry goes through and the problem is
// logged, so a BotID outage can't block real fans. Once production is verified,
// GIVEAWAY_BOTID_REQUIRED=1 turns that into a refusal instead.
async function isLikelyBot(): Promise<boolean> {
  try {
    const verification = await checkBotId();
    return verification.isBot;
  } catch (err) {
    console.error("[Giveaway] BotID check unavailable:", err instanceof Error ? err.message : err);
    return process.env.GIVEAWAY_BOTID_REQUIRED === "1";
  }
}

// Key for the per-network cap. IPv4 is the address itself (one NAT can be a
// whole dorm, so it is not widened). IPv6 is the /64 prefix, since a single
// device or rented server gets a whole /64 and can rotate through it freely.
function networkKey(ip: string): string | null {
  if (ip === "unknown") return null;
  if (!ip.includes(":")) return ip;
  const mapped = /^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i.exec(ip);
  if (mapped) return mapped[1];
  const [head, tail = ""] = ip.toLowerCase().split("::");
  const left = head ? head.split(":") : [];
  const right = tail ? tail.split(":") : [];
  const groups = ip.includes("::")
    ? [...left, ...Array(Math.max(0, 8 - left.length - right.length)).fill("0"), ...right]
    : left;
  return `${groups.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, "")).join(":")}::/64`;
}

export async function POST(req: NextRequest) {
  try {
    if (!(await hasGiveawayAccess())) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }

    const ip = getClientIp(req.headers);
    if (isFlooding(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: silently accept bots without touching the database. The field
    // has a name no browser or password manager autofills.
    if (body.hpCompany) {
      // Counted in the logs so a browser autofill quirk eating real entries
      // would show up as a stream of these.
      console.warn("[Giveaway] Honeypot hit");
      return NextResponse.json({ success: true });
    }

    // Only one campaign is live. The slug is still checked so a stale client
    // can never write into a different campaign's pool.
    if (body.campaign !== CAMPAIGN.slug) {
      return NextResponse.json({ error: "Unknown giveaway." }, { status: 400 });
    }

    if (!isEntryWindowOpen()) {
      return NextResponse.json(
        { error: "This giveaway is not accepting entries right now." },
        { status: 400 }
      );
    }

    if (await isLikelyBot()) {
      return NextResponse.json(
        { error: "We couldn't verify your entry. Please refresh the page and try again." },
        { status: 403 }
      );
    }

    const validation = validateGiveawayEntry(body as Record<string, unknown>);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.message, field: validation.field },
        { status: 400 }
      );
    }
    const data = validation.data;

    // One round trip: network cap, insert, and duplicate detection all happen
    // in giveaway_submit_entry. Opt-ins are queued there, not sent here: the
    // sync job delivers them to Mailchimp and Laylo at a pace those services
    // accept (lib/giveaways/sync).
    const { data: outcome, error } = await getSupabaseAdmin().rpc("giveaway_submit_entry", {
      p: {
        campaign: CAMPAIGN.slug,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        email_normalized: data.emailNormalized,
        phone_e164: data.phoneE164,
        birthdate: data.birthdate,
        team_pick: data.teamPick,
        marketing_opt_in: data.marketingOptIn,
        consent_text: data.marketingOptIn ? MARKETING_CONSENT_TEXT : null,
        ip_address: ip === "unknown" ? null : ip,
        network_key: networkKey(ip),
        user_agent: req.headers.get("user-agent")?.slice(0, 500) || null,
        utm_source: data.utm.source,
        utm_medium: data.utm.medium,
        utm_campaign: data.utm.campaign,
        utm_content: data.utm.content,
        referrer: data.referrer,
      },
      p_network_max: NETWORK_MAX_ENTRIES,
      p_network_minutes: NETWORK_WINDOW_MINUTES,
    });

    if (error) {
      console.error("[Giveaway] Insert failed", error.code, error.message);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }
    switch (outcome) {
      case "ok":
        break;
      case "duplicate_email":
        return NextResponse.json(
          { error: "You're already entered. One entry per person, so you're all set.", field: "email" },
          { status: 409 }
        );
      case "duplicate_phone":
        return NextResponse.json(
          { error: "This phone number has already been used to enter. One entry per person.", field: "phone" },
          { status: 409 }
        );
      case "network_limited":
        return NextResponse.json(
          { error: "A lot of entries are coming from your network right now. Please try again in a few minutes." },
          { status: 429 }
        );
      default:
        console.error("[Giveaway] Unexpected insert outcome", outcome);
        return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }

    // A tally shared across a few seconds of entries, plus this entry if the
    // shared count was taken before it landed.
    const enteredAt = Date.now();
    const { tally, fetchedAt } = await getTeamTallyCached(CAMPAIGN.slug);
    const withMine = fetchedAt < enteredAt ? { ...tally, [data.teamPick]: tally[data.teamPick] + 1 } : tally;
    return NextResponse.json({ success: true, tally: withMine });
  } catch (err) {
    console.error("[Giveaway] Unexpected error", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
