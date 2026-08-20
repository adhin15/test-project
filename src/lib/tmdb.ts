/**
 * Shared helpers for TMDB API proxy routes (P1 account features).
 *
 * Centralizes: reading the httpOnly `MoFlixxUser` session cookie and issuing
 * TMDB requests with the bearer token. Keeps per-route handlers thin and
 * type-safe (no `any`).
 */
import type { NextRequest } from "next/server";

const BASE_URL = process.env.TMDB_BASE_URL ?? "";
const AUTH = process.env.BEARER_TOKEN ?? "";

/** Minimal subset of the `MoFlixxUser` cookie needed for account calls. */
export interface TmdbSession {
  session_id: string;
  account_id: number;
}

/**
 * Read the session from the httpOnly `MoFlixxUser` cookie (server-side).
 * The cookie stores the AccountDetail JSON (which includes `id`) plus
 * `session_id`. Returns null when absent/invalid — used to reject mutating
 * account actions and to guard the `/u/[id]` page.
 */
export function readSession(request: NextRequest): TmdbSession | null {
  const raw = request.cookies.get("MoFlixxUser")?.value;
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const rec = parsed as Record<string, unknown>;
    const sessionId = rec.session_id;
    const accountId = Number(rec.id);
    if (typeof sessionId !== "string" || !sessionId || !Number.isFinite(accountId)) {
      return null;
    }
    return { session_id: sessionId, account_id: accountId };
  } catch {
    return null;
  }
}

/** Shape returned by the proxy routes: HTTP status plus decoded TMDB body. */
export interface TmdbResult<T> {
  ok: boolean;
  status: number;
  body: T;
}

/**
 * Perform a TMDB request. When `sessionId` is supplied it is appended as the
 * `session_id` query param (the server-side bearer token stays in the header,
 * never exposed to the browser).
 */
export async function tmdbFetch<T>(
  path: string,
  init: RequestInit & { sessionId?: string } = {}
): Promise<TmdbResult<T>> {
  const { sessionId, ...rest } = init;
  const sep = path.includes("?") ? "&" : "?";
  const fullUrl = `${BASE_URL}${path}${
    sessionId ? `${sep}session_id=${encodeURIComponent(sessionId)}` : ""
  }`;

  const res = await fetch(fullUrl, {
    ...rest,
    headers: {
      Authorization: AUTH,
      accept: "application/json",
      ...(rest.headers ?? {}),
    },
  });

  const body = (await res.json()) as T;
  return { ok: res.ok, status: res.status, body };
}
