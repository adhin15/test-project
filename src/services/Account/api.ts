/**
 * Account feature API client (P1). All calls go through the Next.js proxy
 * routes, which read the httpOnly `MoFlixxUser` cookie server-side — the
 * browser never sends or stores `session_id`.
 */
import type {
  AccountListKind,
  AccountMediaItem,
  AccountMediaState,
  AccountMediaType,
  AccountTogglePayload,
  Paginated,
} from "@/types";

const url = "/api/tmdb";

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : `Request failed (${response.status}).`;
    throw new Error(message);
  }
  return data as T;
}

/** GET /api/tmdb/account-state/:mediaType/:mediaId */
export const getAccountState = async (payload: {
  accountId: number;
  mediaType: AccountMediaType;
  mediaId: number;
}): Promise<AccountMediaState> => {
  void payload.accountId; // the account is derived from the server-side session cookie
  const response = await fetch(
    `${url}/account-state/${payload.mediaType}/${payload.mediaId}`,
    { method: "GET" }
  );
  return parseResponse<AccountMediaState>(response);
};

/** POST /account/:id/favorite — toggle favorite on/off. */
export const toggleFavorite = async (payload: {
  accountId: number;
  data: AccountTogglePayload;
}): Promise<{ success?: boolean }> => {
  const response = await fetch(`${url}/account/${payload.accountId}/favorite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload.data),
  });
  return parseResponse<{ success?: boolean }>(response);
};

/** POST /account/:id/watchlist — toggle watchlist on/off. */
export const toggleWatchlist = async (payload: {
  accountId: number;
  data: { media_type: AccountMediaType; media_id: number; watchlist: boolean };
}): Promise<{ success?: boolean }> => {
  const response = await fetch(`${url}/account/${payload.accountId}/watchlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload.data),
  });
  return parseResponse<{ success?: boolean }>(response);
};

/** POST /movie/:id/rating — set/replace rating (1-10). */
export const setRating = async (payload: {
  mediaType: AccountMediaType;
  mediaId: number;
  value: number;
}): Promise<{ status?: boolean }> => {
  const response = await fetch(`${url}/${payload.mediaType}/${payload.mediaId}/rating`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: payload.value }),
  });
  return parseResponse<{ status?: boolean }>(response);
};

/** DELETE /movie/:id/rating — remove the user's rating. */
export const deleteRating = async (payload: {
  mediaType: AccountMediaType;
  mediaId: number;
}): Promise<{ status?: boolean }> => {
  const response = await fetch(`${url}/${payload.mediaType}/${payload.mediaId}/rating`, {
    method: "DELETE",
  });
  return parseResponse<{ status?: boolean }>(response);
};

/** GET /account/:id/{listKind}/{mediaType} — paged list. */
export const getAccountList = async (payload: {
  accountId: number;
  listKind: AccountListKind;
  mediaType: AccountMediaType;
  page?: number;
}): Promise<Paginated<AccountMediaItem>> => {
  const pageParam = payload.page && payload.page > 1 ? `?page=${payload.page}` : "";
  const response = await fetch(
    `${url}/account/${payload.accountId}/${payload.listKind}/${payload.mediaType}${pageParam}`,
    { method: "GET" }
  );
  return parseResponse<Paginated<AccountMediaItem>>(response);
};
