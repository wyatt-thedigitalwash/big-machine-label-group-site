import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, computeAccessToken, gateEnabled, gatePassword, safeEqual } from "./access-token";

// Server-side half of the password gate. The request-level check lives in
// src/proxy.ts; these helpers back the login action and the API route.

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function passwordMatches(input: string): boolean {
  return safeEqual(input, gatePassword());
}

export async function hasGiveawayAccess(): Promise<boolean> {
  if (!gateEnabled()) return true;
  const token = (await cookies()).get(ACCESS_COOKIE)?.value ?? "";
  return safeEqual(token, await computeAccessToken(gatePassword()));
}

export async function grantGiveawayAccess(): Promise<void> {
  (await cookies()).set(ACCESS_COOKIE, await computeAccessToken(gatePassword()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}
