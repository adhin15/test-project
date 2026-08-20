/**
 * GET /api/tmdb/account/[accountId]/[listKind]/[mediaType]
 *
 * Returns a page of the logged-in user's favorites / watchlist / rated titles.
 * `listKind` ∈ { favorite, watchlist, rated }. `mediaType` ∈ { movie, tv }.
 * Mirrors TMDB GET /account/:id/{favorite|watchlist|rated}/{mediaType}.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readSession, tmdbFetch } from "@/lib/tmdb";
import type { AccountListKind, AccountMediaItem, AccountMediaType, Paginated } from "@/types";

const LIST_KINDS = new Set<AccountListKind>(["favorite", "watchlist", "rated"]);
const MEDIA_TYPES = new Set<AccountMediaType>(["movie", "tv"]);

export async function GET(request: NextRequest, ctx: { params: Promise<{ accountId: string; listKind: string; mediaType: string }> }) {
  const session = readSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
  }

  const { accountId, listKind, mediaType } = await ctx.params;
  if (Number(accountId) !== session.account_id) {
    return NextResponse.json({ message: "Account id does not match the logged-in session." }, { status: 400 });
  }
  if (!LIST_KINDS.has(listKind as AccountListKind)) {
    return NextResponse.json({ message: "listKind must be favorite, watchlist, or rated." }, { status: 400 });
  }
  if (!MEDIA_TYPES.has(mediaType as AccountMediaType)) {
    return NextResponse.json({ message: "mediaType must be 'movie' or 'tv'." }, { status: 400 });
  }

  const pageRaw = request.nextUrl.searchParams.get("page") ?? "1";
  const pageNum = /^\d+$/.test(pageRaw) ? Number(pageRaw) : 1;
  const path = pageNum > 1
    ? `/account/${session.account_id}/${listKind}/${mediaType}?page=${pageNum}`
    : `/account/${session.account_id}/${listKind}/${mediaType}`;

  const result = await tmdbFetch<Paginated<AccountMediaItem>>(path, {
    method: "GET",
    sessionId: session.session_id,
  });

  return NextResponse.json(result.body, { status: result.ok ? 200 : result.status });
}
