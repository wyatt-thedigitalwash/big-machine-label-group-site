import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SyncInquiry {
  name: string;
  company: string;
  projectType: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SyncInquiry;

    const { name, company, projectType, message } = body;

    if (!name || !company || !projectType || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
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
  } catch {
    return NextResponse.json(
      { error: "Failed to send inquiry." },
      { status: 500 }
    );
  }
}
