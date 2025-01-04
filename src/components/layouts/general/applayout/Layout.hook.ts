import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import Aos from "aos";
import useGetAccountDetail from "./hooks/useGetDetailAccount";
import { QueryClient } from "@tanstack/react-query";

const useLayout = () =>{
    
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
    const [isClient, setIsClient] = useState(false);

    const data = Cookies.get("MoFlixxUser") || "{}";
    
    const userData = JSON.parse(data)    

    useEffect(() => {
      Aos.init({
        duration: 500,
      });
      setIsClient(true);
    }, []);
  
    const contextValue = {
      userData: userData,
    };
    return {
        isClient, 
        setIsClient,
        contextValue,
        queryClient
    }
}

export default useLayout;