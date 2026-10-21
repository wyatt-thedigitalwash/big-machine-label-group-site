import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, computeAccessToken, safeEqual } from "@/lib/giveaways/access-token";

// Password gate for the giveaway preview. Runs before any page renders, so an
// unauthenticated request never receives the campaign content, not even in
// the HTML payload. Unset GIVEAWAY_PASSWORD to open the pages up at launch.
export const config = {
  matcher: ["/giveaways/:path*", "/api/giveaway"],
};

export async function proxy(req: NextRequest) {
  const password = process.env.GIVEAWAY_PASSWORD;
  if (!password) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === "/giveaways/access") return NextResponse.next();

  const token = req.cookies.get(ACCESS_COOKIE)?.value ?? "";
  if (safeEqual(token, await computeAccessToken(password))) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  // Rewrite, not redirect: the URL stays put, so a refresh after logging in
  // lands on the page the fan asked for.
  const url = req.nextUrl.clone();
  url.pathname = "/giveaways/access";
  url.search = "";
  return NextResponse.rewrite(url);
}
