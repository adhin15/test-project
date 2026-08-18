/**
 * Minimal in-memory rate limiter for API routes.
 *
 * NOTE: This is a per-process, in-memory limiter. It is sufficient for
 * basic brute-force protection on a single instance, but for a
 * horizontally-scaled deployment you should back this with a shared store
 * (Redis, etc.).
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10; // max requests per window per key

export function rateLimit(key: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((bucket.resetAt - now) / 1000);
    return { ok: false, retryAfterSec };
  }

  bucket.count += 1;
  return { ok: true };
}
