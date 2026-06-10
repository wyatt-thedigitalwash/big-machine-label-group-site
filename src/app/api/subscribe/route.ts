import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limiting
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 5 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
  submissions.set(ip, recent);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

interface SubscribeData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  website?: string;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as SubscribeData;
    const { firstName, lastName, email, phone, website } = body;

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (firstName.length > 100 || lastName.length > 100 || email.length > 254) {
      return NextResponse.json(
        { error: "Input is too long." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const server = process.env.MAILCHIMP_SERVER;

    if (!apiKey || !audienceId || !server) {
      console.error("[subscribe] Missing Mailchimp env vars");
      return NextResponse.json(
        { error: "Subscription service unavailable." },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            PHONE: phone ?? "",
          },
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      // Member already exists -- treat as success
      if (errorData.title === "Member Exists") {
        return NextResponse.json({ success: true });
      }
      console.error("[subscribe] Mailchimp error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] Failed:", err);
    return NextResponse.json(
      { error: "Failed to subscribe." },
      { status: 500 }
    );
  }
}
