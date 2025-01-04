import { createContext, useContext } from "react";

export const GlobalContext: any = createContext(undefined);
interface ProviderContextType {
  userData: {
    avatar: {
      gravatar: {
        hash: "515dd274e9a649ca1a0272ee19d391cd";
      };
      tmdb: {
        avatar_path: null;
      };
    };
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
    session_id: string;
  };
}

export const useGlobalContext = () => {
  const ctx = useContext<ProviderContextType>(GlobalContext);
  return ctx;
};
