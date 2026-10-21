import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  GATE_PATH,
  computeAccessToken,
  gateEnabled,
  gatePassword,
  safeEqual,
} from "@/lib/giveaways/access-token";

// Password gate for the giveaway preview. Runs before any page renders, so an
// unauthenticated request never receives the campaign content. The gate is on
// by default and only comes off when GIVEAWAY_GATE=off is set at launch.
export const config = {
  matcher: ["/giveaways/:path*", "/api/giveaway"],
};

export async function proxy(req: NextRequest) {
  if (!gateEnabled()) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === GATE_PATH) return NextResponse.next();

  const token = req.cookies.get(ACCESS_COOKIE)?.value ?? "";
  if (safeEqual(token, await computeAccessToken(gatePassword()))) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  // Redirect to the gate's own URL so site chrome can recognise it, carrying
  // the requested path to return to after the password is accepted.
  const url = req.nextUrl.clone();
  url.pathname = GATE_PATH;
  url.search = pathname.startsWith("/giveaways/") && pathname !== GATE_PATH ? `?next=${encodeURIComponent(pathname)}` : "";
  return NextResponse.redirect(url);
}
