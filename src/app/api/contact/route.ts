import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  companyArtist?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactInquiry;

    const { name, email, subject, companyArtist, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
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
  } catch {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
