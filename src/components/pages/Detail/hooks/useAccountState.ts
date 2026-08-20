/**
 * useAccountMediaState — fetch the logged-in user's favorite/watchlist/rated
 * state for a single title. Only fires when logged in.
 */
import { getAccountState } from "@/services/Account/api";
import { useQuery } from "@tanstack/react-query";
import type { AccountMediaType } from "@/types";

interface UseAccountStateParams {
  accountId: number;
  mediaType: AccountMediaType;
  mediaId: number;
  enabled: boolean;
}

const useAccountState = ({ accountId, mediaType, mediaId, enabled }: UseAccountStateParams) => {
  return useQuery({
    queryKey: ["account-state", accountId, mediaType, mediaId],
    queryFn: () => getAccountState({ accountId, mediaType, mediaId }),
    enabled: enabled && accountId > 0 && mediaId > 0,
    retry: false,
  });
};

export default useAccountState;
