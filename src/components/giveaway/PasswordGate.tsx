"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CAMPAIGN } from "@/lib/giveaways/alabama-vs-tennessee";
import { verifyGiveawayPassword, type GateState } from "@/app/giveaways/actions";

const initial: GateState = { ok: false, error: null };

export default function PasswordGate() {
  const [state, formAction, pending] = useActionState(verifyGiveawayPassword, initial);
  const router = useRouter();
  const params = useSearchParams();

  // The action sets the cookie; then go to the page that was requested. Only
  // giveaway paths are honoured so the parameter can never redirect off-site.
  useEffect(() => {
    if (!state.ok) return;
    const next = params.get("next") || "";
    router.replace(next.startsWith("/giveaways/") ? next : CAMPAIGN.path);
  }, [state.ok, router, params]);

  return (
    <section className="min-h-[100svh] flex items-center justify-center px-6 py-20">
      <form action={formAction} className="w-full max-w-[420px] text-center">
        <p className="gv-sub uppercase text-[13px] md:text-[15px] text-[var(--gv-cream)]/80">Private preview</p>
        <h1 className="gv-head text-[30px] md:text-[40px] leading-[1.05] mt-3">Enter the password.</h1>
        <label htmlFor="gv-password" className="sr-only">Password</label>
        <input
          id="gv-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          aria-invalid={Boolean(state.error)}
          className="mt-8 w-full bg-[var(--gv-cream)] text-[var(--gv-charcoal)] gv-body text-[16px] px-4 py-3.5 outline-none border-2 border-transparent focus:border-[var(--gv-orange)] transition-colors duration-300"
        />
        {state.error && (
          <p role="alert" className="gv-body mt-4 text-[13px] text-[var(--gv-orange)]">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full gv-sub uppercase text-[15px] px-8 py-4 bg-[var(--gv-cream)] text-[var(--gv-charcoal)] transition-colors duration-[400ms] ease-out hover:bg-[var(--gv-orange)] hover:text-[var(--gv-cream)] disabled:opacity-60"
        >
          {pending ? "Checking..." : "Continue"}
        </button>
      </form>
    </section>
  );
}
