/**
 * Client-side access to the logged-in session. The httpOnly `MoFlixxUser`
 * cookie stores the AccountDetail JSON (id, username, ...) plus session_id.
 * js-cookie can read the cookie value (the cookie is readable client-side for
 * layout/context purposes; session_id is never sent to the browser by our API
 * proxies — they read it server-side).
 */
import { useGlobalContext } from "@/components/layouts/general/applayout/layout.context";
import { useMemo } from "react";

export interface ClientSession {
  accountId: number;
  username: string;
  isLoggedIn: boolean;
}

export const useAuth = (): ClientSession => {
  const { userData } = useGlobalContext();

  return useMemo(() => {
    const accountId = Number(userData?.id);
    const isLoggedIn = Number.isFinite(accountId) && accountId > 0 && Boolean(userData?.session_id);
    return {
      accountId,
      username: userData?.username ?? "",
      isLoggedIn,
    };
  }, [userData?.id, userData?.username, userData?.session_id]);
};

export default useAuth;
