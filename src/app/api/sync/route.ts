import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

interface SyncInquiry {
  name: string;
  company: string;
  projectType: string;
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

    const body = (await request.json()) as SyncInquiry;
    const { name, company, projectType, message, website } = body;

    // Honeypot -- if filled, silently succeed
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || !company || !projectType || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name is too long." },
        { status: 400 }
      );
    }
    if (company.length > 200) {
      return NextResponse.json(
        { error: "Company name is too long." },
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
      to: "sync@bigmachinerecords.com",
      subject: `Sync Inquiry: ${projectType} -- ${company}`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Project Type: ${projectType}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[sync] Failed to send:", err);
    return NextResponse.json(
      { error: "Failed to send inquiry." },
      { status: 500 }
    );
  }
}
