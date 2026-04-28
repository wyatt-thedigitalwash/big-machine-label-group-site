"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      companyArtist: (
        form.elements.namedItem("companyArtist") as HTMLInputElement
      ).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-[#333333] focus:border-[#CA2125] text-white font-[family-name:var(--font-body)] text-[15px] py-3.5 px-0 outline-none transition-colors duration-300 ease-out";

  if (status === "sent") {
    return (
      <div className="py-20 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-[48px] uppercase text-white leading-none">
          Message Received.
        </h2>
        <p
          className="font-[family-name:var(--font-body)] text-[15px] mt-4"
          style={{ color: "#717171" }}
        >
          We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <label
          htmlFor="name"
          className="block font-[family-name:var(--font-body)] text-[14px] text-white mb-2"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-[family-name:var(--font-body)] text-[14px] text-white mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block font-[family-name:var(--font-body)] text-[14px] text-white mb-2"
        >
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className={`${inputClasses} appearance-none`}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Select a subject
          </option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Press & Media">Press &amp; Media</option>
          <option value="A&R Submission">A&amp;R Submission</option>
          <option value="Partnership">Partnership</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="companyArtist"
          className="block font-[family-name:var(--font-body)] text-[14px] text-white mb-2"
        >
          Company / Artist{" "}
          <span style={{ color: "#717171" }}>(optional)</span>
        </label>
        <input
          id="companyArtist"
          name="companyArtist"
          type="text"
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-[family-name:var(--font-body)] text-[14px] text-white mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-[18px] font-[family-name:var(--font-display)] text-[20px] uppercase text-white border-none cursor-pointer transition-opacity duration-200 ease-out hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#CA2125" }}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "error" && (
        <p
          className="font-[family-name:var(--font-body)] text-[14px]"
          style={{ color: "#CA2125" }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
