import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, computeAccessToken, safeEqual } from "./access-token";

// Server-side half of the password gate. The request-level check lives in
// src/proxy.ts; these helpers back the login action and the API route.

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function isGateEnabled(): boolean {
  return Boolean(process.env.GIVEAWAY_PASSWORD);
}

export function passwordMatches(input: string): boolean {
  const password = process.env.GIVEAWAY_PASSWORD;
  return Boolean(password) && safeEqual(input, password as string);
}

export async function hasGiveawayAccess(): Promise<boolean> {
  const password = process.env.GIVEAWAY_PASSWORD;
  if (!password) return true;
  const token = (await cookies()).get(ACCESS_COOKIE)?.value ?? "";
  return safeEqual(token, await computeAccessToken(password));
}

export async function grantGiveawayAccess(): Promise<void> {
  const password = process.env.GIVEAWAY_PASSWORD;
  if (!password) return;
  (await cookies()).set(ACCESS_COOKIE, await computeAccessToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}
