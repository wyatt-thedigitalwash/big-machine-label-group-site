import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In-memory rate limiting
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 5 * 60 * 1000; // 5 minutes

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

interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  companyArtist?: string;
  message: string;
  website?: string; // honeypot
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactInquiry;
    const { name, email, subject, companyArtist, message, website } = body;

    // Honeypot -- if filled, silently succeed
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name is too long." },
        { status: 400 }
      );
    }
    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email is too long." },
        { status: 400 }
      );
    }
    if (subject && subject.length > 200) {
      return NextResponse.json(
        { error: "Subject is too long." },
        { status: 400 }
      );
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Big Machine Records <noreply@bigmachinerecords.com>",
      to: "info@bigmachinerecords.com",
      replyTo: email,
      subject: `Contact: ${subject} -- ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        companyArtist ? `Company / Artist: ${companyArtist}` : "",
        ``,
        `Message:`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Failed to send:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
