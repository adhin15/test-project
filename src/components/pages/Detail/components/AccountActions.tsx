"use client";

/**
 * AccountActions — the per-title account controls shown on movie/series detail
 * pages: Favorite toggle, Watchlist toggle, and a 1–10 rating picker.
 *
 * Only rendered when the user is logged in. Reads the live account state via
 * useAccountState and drives mutations via useAccountActions.
 */
import Loader from "@/components/shared/Loader";
import { useAuth } from "@/components/layouts/general/applayout/hooks/useAuthSession";
import useAccountActions from "../hooks/useAccountActions";
import useAccountState from "../hooks/useAccountState";
import { useState } from "react";
import type { AccountMediaType } from "@/types";

interface AccountActionsProps {
  mediaType: AccountMediaType;
  mediaId: number;
}

const STAR_TOTAL = 10;
const STAR_FILL = "#ffc300";
const STAR_EMPTY = "#374151";

const AccountActions = ({ mediaType, mediaId }: AccountActionsProps) => {
  const { accountId, isLoggedIn } = useAuth();
  const [hover, setHover] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { data: state, isLoading: stateLoading } = useAccountState({
    accountId,
    mediaType,
    mediaId,
    enabled: isLoggedIn,
  });

  const { rate, removeRating, favorite, watchlist } = useAccountActions({
    accountId,
    mediaType,
    mediaId,
    onError: (err) =>
      setError(err instanceof Error ? err.message : "Action failed. Please try again."),
  });

  if (!isLoggedIn) return null;

  const currentRating = state?.rated?.value ?? 0;
  const isFavorite = Boolean(state?.favorite);
  const isWatchlist = Boolean(state?.watchlist);
  const anyPending =
    stateLoading || favorite.isPending || watchlist.isPending || rate.isPending || removeRating.isPending;

  const handleRate = (value: number) => {
    setError(null);
    rate.mutate(value);
  };

  const handleRemoveRating = () => {
    setError(null);
    removeRating.mutate();
  };

  return (
    <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Rating picker */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold">
          Your rating{currentRating > 0 ? `: ${currentRating}` : ""}
        </span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label={`Rate this ${mediaType}`}>
          {Array.from({ length: STAR_TOTAL }, (_, i) => i + 1).map((star) => {
            const filled = star <= (hover || currentRating);
            return (
              <button
                key={star}
                type="button"
                aria-label={`Set rating to ${star}`}
                className="p-0 bg-transparent border-0 cursor-pointer transition-transform hover:scale-125 disabled:opacity-50"
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRate(star)}
                disabled={anyPending}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 16 16"
                  fill={filled ? STAR_FILL : STAR_EMPTY}
                  className="bi bi-star-fill"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </button>
            );
          })}
          {currentRating > 0 && (
            <button
              type="button"
              onClick={handleRemoveRating}
              disabled={removeRating.isPending}
              className="ml-2 text-xs underline opacity-70 hover:opacity-100 disabled:opacity-30"
            >
              {removeRating.isPending ? "Removing..." : "Remove"}
            </button>
          )}
          {rate.isPending && <Loader size={16} />}
        </div>
        {error && <span className="text-[#e84c3d] text-xs">{error}</span>}
      </div>

      {/* Favorite + Watchlist */}
      <div className="flex gap-2 lg:ml-4">
        <button
          type="button"
          onClick={() => favorite.mutate(isFavorite)}
          disabled={favorite.isPending}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition disabled:opacity-60 ${
            isFavorite
              ? "bg-[#ffc300] text-black border-[#ffc300]"
              : "bg-transparent text-white border-[#374151] hover:border-[#ffc300]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
          {favorite.isPending ? <Loader size={12} /> : isFavorite ? "Favorite" : "Add to Favorites"}
        </button>

        <button
          type="button"
          onClick={() => watchlist.mutate(isWatchlist)}
          disabled={watchlist.isPending}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition disabled:opacity-60 ${
            isWatchlist
              ? "bg-[#ffc300] text-black border-[#ffc300]"
              : "bg-transparent text-white border-[#374151] hover:border-[#ffc300]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className="bi bi-bookmark-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
          </svg>
          {watchlist.isPending ? <Loader size={12} /> : isWatchlist ? "Watchlisted" : "Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default AccountActions;
