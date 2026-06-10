"use client";

import { useState, type FormEvent } from "react";

export default function SubscribeBar() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section className="w-full bg-black px-8 py-12 md:px-20 md:py-16" style={{ borderTop: "1px solid #1a1a1a" }}>
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none">
            You're In.
          </h2>
          <p
            className="font-[family-name:var(--font-body)] text-[14px] mt-3"
            style={{ color: "#717171" }}
          >
            Welcome to the list.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-black px-8 py-12 md:px-20 md:py-16" style={{ borderTop: "1px solid #1a1a1a" }}>
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none">
            Stay Connected
          </h2>
          <p
            className="font-[family-name:var(--font-body)] text-[14px] mt-3"
            style={{ color: "#717171" }}
          >
            Subscribe for news, releases, and tour announcements from Big Machine Records and Nashville Harbor Records.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Honeypot */}
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              name="firstName"
              type="text"
              required
              placeholder="First Name"
              className="w-full bg-transparent border-0 border-b border-[#333333] focus:border-[#CA2125] text-white font-[family-name:var(--font-body)] text-[14px] py-3 px-0 outline-none transition-colors duration-300 ease-out placeholder:text-[#717171]"
            />
            <input
              name="lastName"
              type="text"
              required
              placeholder="Last Name"
              className="w-full bg-transparent border-0 border-b border-[#333333] focus:border-[#CA2125] text-white font-[family-name:var(--font-body)] text-[14px] py-3 px-0 outline-none transition-colors duration-300 ease-out placeholder:text-[#717171]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="w-full bg-transparent border-0 border-b border-[#333333] focus:border-[#CA2125] text-white font-[family-name:var(--font-body)] text-[14px] py-3 px-0 outline-none transition-colors duration-300 ease-out placeholder:text-[#717171]"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              className="w-full bg-transparent border-0 border-b border-[#333333] focus:border-[#CA2125] text-white font-[family-name:var(--font-body)] text-[14px] py-3 px-0 outline-none transition-colors duration-300 ease-out placeholder:text-[#717171]"
            />
          </div>

          <p
            className="font-[family-name:var(--font-body)] text-[13px] text-center mb-5"
            style={{ color: "#717171" }}
          >
            By subscribing, you agree to the Big Machine Records{" "}
            <a
              href="/privacy"
              className="no-underline transition-colors duration-200 ease-out hover:text-white"
              style={{ color: "#C8C7C8" }}
            >
              Privacy Policy
            </a>
            .
          </p>

          <div className="text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="font-[family-name:var(--font-display)] text-[16px] uppercase text-white px-10 py-3 border-none cursor-pointer transition-opacity duration-200 ease-out hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#CA2125" }}
            >
              {status === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {status === "error" && (
            <p
              role="alert"
              aria-live="polite"
              className="font-[family-name:var(--font-body)] text-[14px] text-center mt-4"
              style={{ color: "#CA2125" }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
