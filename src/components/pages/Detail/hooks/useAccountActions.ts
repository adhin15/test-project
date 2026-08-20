/**
 * useAccountActions — mutations that update the logged-in user's state for a
 * single title: set/delete rating, toggle favorite, toggle watchlist.
 * Invalidates the local account-state query on success.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteRating,
  setRating,
  toggleFavorite,
  toggleWatchlist,
} from "@/services/Account/api";
import type { AccountMediaType } from "@/types";

interface UseAccountActionsParams {
  accountId: number;
  mediaType: AccountMediaType;
  mediaId: number;
  onError?: (err: unknown) => void;
}

const useAccountActions = ({ accountId, mediaType, mediaId, onError }: UseAccountActionsParams) => {
  const queryClient = useQueryClient();
  const stateKey = ["account-state", accountId, mediaType, mediaId];

  const invalidateState = () => {
    queryClient.invalidateQueries({ queryKey: stateKey });
  };

  const rate = useMutation({
    mutationFn: (value: number) => setRating({ mediaType, mediaId, value }),
    onSuccess: invalidateState,
    onError,
  });

  const removeRating = useMutation({
    mutationFn: () => deleteRating({ mediaType, mediaId }),
    onSuccess: invalidateState,
    onError,
  });

  const favorite = useMutation({
    mutationFn: (current: boolean) =>
      toggleFavorite({
        accountId,
        data: { media_type: mediaType, media_id: mediaId, favorite: !current },
      }),
    onSuccess: invalidateState,
    onError,
  });

  const watchlist = useMutation({
    mutationFn: (current: boolean) =>
      toggleWatchlist({
        accountId,
        data: { media_type: mediaType, media_id: mediaId, watchlist: !current },
      }),
    onSuccess: invalidateState,
    onError,
  });

  return { rate, removeRating, favorite, watchlist };
};

export default useAccountActions;
