import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { hasGiveawayAccess } from "@/lib/giveaways/access";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { validateGiveawayEntry } from "@/lib/giveaways/validation";
import { getTeamTally } from "@/lib/giveaways/tally";
import { toUsDisplay } from "@/lib/subscribe-validation";
import { subscribeToMailchimp } from "@/lib/mailchimp";
import { subscribeToLaylo } from "@/lib/laylo";
import {
  CAMPAIGN,
  isEntryWindowOpen,
  MARKETING_CONSENT_TEXT,
} from "@/lib/giveaways/alabama-vs-tennessee";

const isRateLimited = createRateLimiter(5, 5 * 60 * 1000);

const GENERIC_ERROR = "Something went wrong. Please try again.";

export async function POST(req: NextRequest) {
  try {
    if (!(await hasGiveawayAccess())) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }

    const ip = getClientIp(req.headers);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Honeypot: silently accept bots without touching the database.
    if (body.website) {
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

    const validation = validateGiveawayEntry(body as Record<string, unknown>);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.message, field: validation.field },
        { status: 400 }
      );
    }
    const data = validation.data;

    const { error } = await getSupabaseAdmin().from("giveaway_entries").insert({
      campaign: CAMPAIGN.slug,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone_e164: data.phoneE164,
      team_pick: data.teamPick,
      marketing_opt_in: data.marketingOptIn,
      sms_opt_in: data.marketingOptIn,
      consent_text: data.marketingOptIn ? MARKETING_CONSENT_TEXT : null,
      ip_address: ip === "unknown" ? null : ip,
      user_agent: req.headers.get("user-agent")?.slice(0, 500) || null,
      utm_source: data.utm.source || null,
      utm_medium: data.utm.medium || null,
      utm_campaign: data.utm.campaign || null,
      utm_content: data.utm.content || null,
      referrer: data.referrer || null,
    });

    if (error) {
      // 23505 = unique_violation on (campaign, email): one entry per person.
      if (error.code === "23505") {
        return NextResponse.json(
          {
            error: "You're already entered. One entry per person, so you're all set.",
            field: "email",
          },
          { status: 409 }
        );
      }
      console.error("[Giveaway] Insert failed", error.code, error.message);
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }

    // Opted-in fans also go to the label's mailing list and SMS tool. Both are
    // best effort: Supabase already holds the entry, so a provider failure is
    // logged for reconciliation and never surfaced to the fan.
    if (data.marketingOptIn) {
      const subscriber = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneE164: data.phoneE164,
        phoneDisplay: toUsDisplay(data.phoneE164),
        country: "United States",
        zipCode: "",
      };
      const [mc, laylo] = await Promise.allSettled([
        subscribeToMailchimp(subscriber),
        subscribeToLaylo(subscriber),
      ]);
      if (mc.status !== "fulfilled" || !mc.value.ok) {
        console.error("[Giveaway] Mailchimp forward failed for", data.email);
      }
      if (laylo.status !== "fulfilled" || !laylo.value.ok) {
        console.error("[Giveaway] Laylo forward failed for", data.email);
      }
    }

    const tally = await getTeamTally(CAMPAIGN.slug);
    return NextResponse.json({ success: true, tally });
  } catch (err) {
    console.error("[Giveaway] Unexpected error", err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
