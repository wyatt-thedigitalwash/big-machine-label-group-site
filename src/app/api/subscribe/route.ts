import { NextRequest, NextResponse } from "next/server";
import { validateSubscriber } from "@/lib/subscribe-validation";
import { subscribeToMailchimp, type MailchimpResult } from "@/lib/mailchimp";
import { subscribeToLaylo, type LayloResult } from "@/lib/laylo";

// In-memory rate limiting: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// Best-effort, per-instance limiter. Prune expired entries so the map cannot
// grow unbounded from one-off IPs on a long-lived (warm) server instance.
function pruneRateLimit(now: number): void {
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateLimitMap.size > 5000) pruneRateLimit(now);

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
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

    // Honeypot: silently accept bots without hitting any provider.
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const validation = validateSubscriber(body as Record<string, unknown>);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.message, field: validation.field },
        { status: 400 }
      );
    }
    const data = validation.data;

    // Mailchimp and Laylo run fully independently. allSettled guarantees one
    // path can never block or reject the other, and each helper already
    // catches its own errors and returns a typed result.
    const [mcSettled, layloSettled] = await Promise.allSettled([
      subscribeToMailchimp(data),
      subscribeToLaylo(data),
    ]);

    const mc: MailchimpResult =
      mcSettled.status === "fulfilled"
        ? mcSettled.value
        : { ok: false, kind: "error", error: "rejected" };
    const laylo: LayloResult =
      layloSettled.status === "fulfilled"
        ? layloSettled.value
        : { ok: false, error: "rejected" };

    // Laylo is best-effort: log its outcome but never surface it to the user.
    if (!laylo.ok) {
      console.error("[Subscribe] Laylo capture failed for", data.email, laylo.error);
    }

    // Mailchimp is the primary/durable store and decides the user-facing result.
    if (mc.ok) {
      return NextResponse.json({ success: true });
    }
    // Previously opted-out: treat as a friendly soft success, not an error.
    if (mc.kind === "compliance") {
      return NextResponse.json({
        success: true,
        message:
          "You may already be on our list. If not, please re-subscribe from our signup form.",
      });
    }
    if (mc.kind === "invalid_email") {
      return NextResponse.json(
        { error: "Please check your email address and try again." },
        { status: 400 }
      );
    }

    // Hard Mailchimp failure. Laylo may still hold the data; log for reconciliation.
    console.error(
      "[Subscribe] Mailchimp failed for",
      data.email,
      mc.error,
      "laylo_ok=" + laylo.ok
    );
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  } catch (err) {
    console.error("[Subscribe] Unexpected error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
