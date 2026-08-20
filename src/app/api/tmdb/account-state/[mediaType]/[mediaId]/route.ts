/**
 * GET /api/tmdb/account-state/[mediaType]/[mediaId]
 *
 * Returns the logged-in user's state for one title (favorite/watchlist/rated)
 * so the detail page can render the correct initial toggle/rating state.
 * Mirrors TMDB GET /account/:id/{mediaType}/{mediaId}/account_states. The
 * account id + session come from the server-side `MoFlixxUser` cookie.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession, tmdbFetch } from "@/lib/tmdb";
import type { AccountMediaState, AccountMediaType } from "@/types";

export async function GET(request: NextRequest, ctx: { params: Promise<{ mediaType: string; mediaId: string }> }) {
  const session = readSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
  }

  const { mediaType, mediaId } = await ctx.params;
  if (mediaType !== "movie" && mediaType !== "tv") {
    return NextResponse.json({ message: "mediaType must be 'movie' or 'tv'." }, { status: 400 });
  }
  if (!/^\d+$/.test(mediaId)) {
    return NextResponse.json({ message: "Invalid media id." }, { status: 400 });
  }

  const result = await tmdbFetch<AccountMediaState>(
    `/account/${session.account_id}/${mediaType as AccountMediaType}/${mediaId}/account_states`,
    { method: "GET", sessionId: session.session_id }
  );

  return NextResponse.json(result.body, { status: result.ok ? 200 : result.status });
}
