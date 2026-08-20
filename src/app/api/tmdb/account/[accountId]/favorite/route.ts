/**
 * POST /api/tmdb/account/[accountId]/favorite — toggle a title in/out of favorites.
 *
 * Requires login. The real account id + session come from the server-side
 * `MoFlixxUser` cookie; the `[accountId]` path segment is kept for URL compatibility
 * and validated to match the logged-in account. Mirrors TMDB POST /account/:id/favorite.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { readSession, tmdbFetch } from "@/lib/tmdb";
import type { AccountMediaType } from "@/types";

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ accountId: string }> }) {
  const session = readSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
  }

  const limit = rateLimit(`favorite:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const { accountId } = await ctx.params;
  if (Number(accountId) !== session.account_id) {
    return NextResponse.json({ message: "Account id does not match the logged-in session." }, { status: 400 });
  }

  const body = await request.json();
  const { media_type, media_id, favorite } = body as {
    media_type?: unknown;
    media_id?: unknown;
    favorite?: unknown;
  };

  if (media_type !== "movie" && media_type !== "tv") {
    return NextResponse.json({ message: "media_type must be 'movie' or 'tv'." }, { status: 400 });
  }
  if (typeof media_id !== "number" || !Number.isInteger(media_id)) {
    return NextResponse.json({ message: "media_id must be an integer." }, { status: 400 });
  }
  if (typeof favorite !== "boolean") {
    return NextResponse.json({ message: "favorite must be a boolean." }, { status: 400 });
  }

  const payload: { media_type: AccountMediaType; media_id: number; favorite: boolean } = {
    media_type,
    media_id,
    favorite,
  };

  const result = await tmdbFetch<{ status_code?: number; status_message?: string; success?: boolean }>(
    `/account/${session.account_id}/favorite`,
    {
      method: "POST",
      sessionId: session.session_id,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  return NextResponse.json(result.body, { status: result.ok ? 200 : result.status });
}
