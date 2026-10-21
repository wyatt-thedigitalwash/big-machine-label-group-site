// Runtime-neutral pieces of the giveaway password gate, shared by the proxy
// (request edge) and the server helpers. Uses Web Crypto so it runs anywhere.

export const ACCESS_COOKIE = "gv_access";

export async function computeAccessToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`giveaway:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Constant-time string compare so a wrong token never leaks timing.
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
