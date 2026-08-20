/**
 * useProfile — login-guard + account-list fetching for /u/[id].
 *
 * Reads the client session. When not logged in it redirects to /login (the
 * server routes also enforce auth; this is the UX redirect). For the active
 * (tab, media) combination it queries the matching list via useAccountList.
 */
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/layouts/general/applayout/hooks/useAuthSession";
import useAccountList from "./hooks/useAccountList";
import { useEffect } from "react";
import type { AccountListKind, AccountMediaType } from "@/types";

interface UseProfileParams {
  activeTab: AccountListKind;
  activeMedia: AccountMediaType;
}

const useProfile = ({ activeTab, activeMedia }: UseProfileParams) => {
  const { accountId, username, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  const listQuery = useAccountList({
    accountId,
    listKind: activeTab,
    mediaType: activeMedia,
    page: 1,
    enabled: isLoggedIn,
  });

  return {
    username,
    isLoggedIn,
    items: listQuery.data?.results ?? [],
    isLoading: listQuery.isLoading,
    activeTab,
    activeMedia,
  };
};

export default useProfile;
