/**
 * useAccountList — fetch a paged list of the user's favorites/watchlist/rated
 * titles. Only fires when logged in.
 */
import { getAccountList } from "@/services/Account/api";
import { useQuery } from "@tanstack/react-query";
import type { AccountListKind, AccountMediaType } from "@/types";

interface UseAccountListParams {
  accountId: number;
  listKind: AccountListKind;
  mediaType: AccountMediaType;
  page?: number;
  enabled: boolean;
}

const useAccountList = ({ accountId, listKind, mediaType, page = 1, enabled }: UseAccountListParams) => {
  return useQuery({
    queryKey: ["account-list", accountId, listKind, mediaType, page],
    queryFn: () => getAccountList({ accountId, listKind, mediaType, page }),
    enabled: enabled && accountId > 0,
    retry: false,
  });
};

export default useAccountList;
