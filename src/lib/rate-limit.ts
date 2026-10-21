// Best-effort, per-instance in-memory rate limiter keyed by client IP. Same
// approach as the subscribe route: good enough to blunt form spam on a
// serverless function without adding a store.

interface Entry {
  count: number;
  resetAt: number;
}

export function createRateLimiter(max: number, windowMs: number) {
  const map = new Map<string, Entry>();

  function prune(now: number): void {
    for (const [key, entry] of map) {
      if (now > entry.resetAt) map.delete(key);
    }
  }

  return function isRateLimited(key: string): boolean {
    const now = Date.now();
    if (map.size > 5000) prune(now);

    const entry = map.get(key);
    if (!entry || now > entry.resetAt) {
      map.set(key, { count: 1, resetAt: now + windowMs });
      return false;
    }
    entry.count++;
    return entry.count > max;
  };
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
