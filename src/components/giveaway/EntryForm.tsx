"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CAMPAIGN,
  MARKETING_CONSENT_TEXT,
  TEAMS,
  type TeamPick,
} from "@/lib/giveaways/alabama-vs-tennessee";
import type { GiveawayField } from "@/lib/giveaways/validation";

type Tally = Record<TeamPick, number>;
type Status = "idle" | "loading" | "success" | "error";

interface Props {
  team: TeamPick;
  entriesOpen: boolean;
  onEntered: (tally: Tally | null) => void;
}

function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

const inputClass =
  "w-full bg-[var(--gv-cream)] text-[var(--gv-charcoal)] gv-body text-[15px] px-4 py-3.5 outline-none border-2 transition-colors duration-300 ease-out";
// Labels use Graduate, the campaign sub-head face, so they sit with the
// "Step two" eyebrow and the buttons rather than reading as generic form UI.
const labelClass = "gv-sub block uppercase text-[12px] md:text-[13px] mb-2 text-[var(--gv-cream)]";

export default function EntryForm({ team, entriesOpen, onEntered }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeRules, setAgreeRules] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorField, setErrorField] = useState<GiveawayField | "">("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const utm = useRef({ source: "", medium: "", campaign: "", content: "", referrer: "" });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    utm.current = {
      source: p.get("utm_source") || "",
      medium: p.get("utm_medium") || "",
      campaign: p.get("utm_campaign") || "",
      content: p.get("utm_content") || "",
      referrer: document.referrer || "",
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorField("");
    setErrorMessage("");
    try {
      const res = await fetch("/api/giveaway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign: CAMPAIGN.slug,
          firstName,
          lastName,
          email,
          phone,
          teamPick: team,
          agreeRules,
          marketingOptIn,
          website,
          utmSource: utm.current.source,
          utmMedium: utm.current.medium,
          utmCampaign: utm.current.campaign,
          utmContent: utm.current.content,
          referrer: utm.current.referrer,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok) {
        setStatus("success");
        onEntered(data?.tally ?? null);
        return;
      }
      setErrorField(data?.field || "");
      setErrorMessage(data?.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${CAMPAIGN.path}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const border = (field: GiveawayField) =>
    errorField === field ? "border-[var(--gv-charcoal)]" : "border-transparent focus:border-[var(--gv-charcoal)]/40";

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="text-[var(--gv-cream)] gv-stagger">
        <p className="gv-body text-[15px] leading-relaxed">
          You are entered for {TEAMS[team].name}. We will email the winner on {CAMPAIGN.drawingOn}.
          {marketingOptIn && " Check your phone for a text and reply to confirm updates."}
        </p>
        <p className="gv-body text-[15px] leading-relaxed mt-4">
          Want your side to win the split? Send this to someone who bleeds{" "}
          {team === "alabama" ? "crimson" : "orange"}.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={copyLink}
            className="gv-sub uppercase text-[14px] px-8 py-4 bg-[var(--gv-cream)] text-[var(--gv-charcoal)] transition-opacity duration-[400ms] hover:opacity-85"
          >
            {copied ? "Link copied" : "Copy link"}
          </button>
          <a
            href={CAMPAIGN.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gv-sub uppercase text-[14px] px-8 py-4 border-2 border-[var(--gv-cream)] text-[var(--gv-cream)] text-center transition-colors duration-[400ms] hover:bg-[var(--gv-cream)] hover:text-[var(--gv-charcoal)]"
          >
            Listen to the song
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full gv-stagger">
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="gv-first" className={labelClass}>First name</label>
          <input id="gv-first" name="firstName" autoComplete="given-name" required value={firstName}
            onChange={(e) => setFirstName(e.target.value)} className={`${inputClass} ${border("firstName")}`}
            aria-invalid={errorField === "firstName"} />
        </div>
        <div>
          <label htmlFor="gv-last" className={labelClass}>Last name</label>
          <input id="gv-last" name="lastName" autoComplete="family-name" required value={lastName}
            onChange={(e) => setLastName(e.target.value)} className={`${inputClass} ${border("lastName")}`}
            aria-invalid={errorField === "lastName"} />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="gv-email" className={labelClass}>Email</label>
        <input id="gv-email" name="email" type="email" inputMode="email" autoComplete="email" required
          value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} ${border("email")}`}
          aria-invalid={errorField === "email"} />
      </div>
      <div className="mt-5">
        <label htmlFor="gv-phone" className={labelClass}>Mobile number</label>
        <input id="gv-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required
          placeholder="615-555-0100" value={phone} onChange={(e) => setPhone(formatUsPhone(e.target.value))}
          className={`${inputClass} ${border("phone")}`} aria-invalid={errorField === "phone"} />
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="gv-website">Website</label>
        <input id="gv-website" name="website" tabIndex={-1} autoComplete="off" value={website}
          onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className="mt-7 flex flex-col gap-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" required checked={agreeRules} onChange={(e) => setAgreeRules(e.target.checked)}
            className="mt-[3px] h-4 w-4 shrink-0 accent-[var(--gv-charcoal)]" aria-invalid={errorField === "agreeRules"} />
          <span className="gv-body text-[12px] leading-relaxed text-[var(--gv-cream)]">
            I am {CAMPAIGN.eligibility.minimumAge} or older, a legal resident of the United States, and I agree to the{" "}
            <Link href={CAMPAIGN.rulesPath} target="_blank" rel="noopener" className="underline underline-offset-2">Official Rules</Link> and{" "}
            <Link href="/legal/privacy" target="_blank" rel="noopener" className="underline underline-offset-2">Privacy Policy</Link>.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)}
            className="mt-[3px] h-4 w-4 shrink-0 accent-[var(--gv-charcoal)]" />
          <span className="gv-body text-[12px] leading-relaxed text-[var(--gv-cream)]/90">
            {MARKETING_CONSENT_TEXT} See our{" "}
            <Link href="/legal/tcpa" target="_blank" rel="noopener" className="underline underline-offset-2">TCPA Policy</Link>.
          </span>
        </label>
      </div>

      {status === "error" && errorMessage && (
        <p role="alert" className="gv-body mt-5 text-[13px] bg-[var(--gv-charcoal)] text-[var(--gv-cream)] px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !entriesOpen}
        className="mt-7 w-full gv-sub uppercase text-[15px] px-8 py-4 bg-[var(--gv-charcoal)] text-[var(--gv-cream)] transition-opacity duration-[400ms] ease-out hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Entering..." : entriesOpen ? `Enter for ${TEAMS[team].name}` : "Entries closed"}
      </button>
      <p className="gv-body mt-4 text-[11px] leading-relaxed text-[var(--gv-cream)]/70">
        No purchase necessary. One entry per person. Void where prohibited. Sponsored by {CAMPAIGN.sponsor.name}.
      </p>
    </form>
  );
}
