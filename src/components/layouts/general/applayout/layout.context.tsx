import { createContext, useContext } from "react";
import type { AccountDetail } from "@/types";

export interface UserData extends AccountDetail {
  session_id?: string;
}

export interface GlobalContextValue {
  userData?: UserData;
}

export const GlobalContext = createContext<GlobalContextValue>({
  userData: undefined,
});

export const useGlobalContext = () => {
  const ctx = useContext<GlobalContextValue>(GlobalContext);
  return ctx;
};
