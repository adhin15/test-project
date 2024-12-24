import { createContext, useContext } from 'react';


export const GlobalContext:any = createContext(undefined);

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  return ctx;
};
