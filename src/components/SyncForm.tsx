"use client";

import { useState, type FormEvent } from "react";

export default function SyncForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-[#333333] focus:border-[#CA2125] text-white font-[family-name:var(--font-body)] text-[15px] py-3.5 px-0 outline-none transition-colors duration-300 ease-out";

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
          htmlFor="company"
          className="block font-[family-name:var(--font-body)] text-[14px] text-white mb-2"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor="projectType"
          className="block font-[family-name:var(--font-body)] text-[14px] text-white mb-2"
        >
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          className={`${inputClasses} appearance-none`}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Select a project type
          </option>
          <option value="Film">Film</option>
          <option value="Television">Television</option>
          <option value="Advertising">Advertising</option>
          <option value="Video Game">Video Game</option>
          <option value="Other">Other</option>
        </select>
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
          rows={5}
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
        {status === "sending" ? "Sending..." : "Submit Inquiry"}
      </button>

      {status === "sent" && (
        <p
          className="font-[family-name:var(--font-body)] text-[14px] text-center"
          style={{ color: "#CA2125" }}
        >
          Inquiry submitted. We will be in touch.
        </p>
      )}

      {status === "error" && (
        <p
          className="font-[family-name:var(--font-body)] text-[14px] text-center"
          style={{ color: "#CA2125" }}
        >
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
