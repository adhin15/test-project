/**
 * POST /api/tmdb/tv/[id]/rating — set/replace a rating (1-10) for a series.
 * DELETE — remove the current user's rating.
 *
 * Requires login. Mirrors TMDB: POST /tv/:id/rating, DELETE /tv/:id/rating.
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { readSession, tmdbFetch } from "@/lib/tmdb";

const MAX_RATING = 10;
const MIN_RATING = 1;

function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = readSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
  }

  const limit = rateLimit(`rating:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const { id } = await ctx.params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ message: "Invalid tv id." }, { status: 400 });
  }

  const { value } = await request.json();
  if (!Number.isInteger(value) || value < MIN_RATING || value > MAX_RATING) {
    return NextResponse.json(
      { message: `Rating must be an integer between ${MIN_RATING} and ${MAX_RATING}.` },
      { status: 400 }
    );
  }

  const result = await tmdbFetch<{ status: boolean; status_message?: string }>(`/tv/${id}/rating`, {
    method: "POST",
    sessionId: session.session_id,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  });

  return NextResponse.json(result.body, { status: result.ok ? 200 : result.status });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const session = readSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized. Please log in." }, { status: 401 });
  }

  const limit = rateLimit(`rating:${clientIp(request)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const { id } = await ctx.params;
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ message: "Invalid tv id." }, { status: 400 });
  }

  const result = await tmdbFetch<{ status: boolean; status_message?: string }>(`/tv/${id}/rating`, {
    method: "DELETE",
    sessionId: session.session_id,
  });

  return NextResponse.json(result.body, { status: result.ok ? 200 : result.status });
}
