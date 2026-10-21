"use server";

import { headers } from "next/headers";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { grantGiveawayAccess, passwordMatches } from "@/lib/giveaways/access";

const isRateLimited = createRateLimiter(10, 15 * 60 * 1000);

export interface GateState {
  error: string | null;
  ok: boolean;
}

export async function verifyGiveawayPassword(
  _prev: GateState,
  formData: FormData
): Promise<GateState> {
  const ip = getClientIp(await headers());
  if (isRateLimited(ip)) {
    return { ok: false, error: "Too many attempts. Please wait a few minutes and try again." };
  }

  const input = formData.get("password");
  if (typeof input !== "string" || !passwordMatches(input.trim())) {
    return { ok: false, error: "That password is not right." };
  }

  await grantGiveawayAccess();
  return { ok: true, error: null };
}
