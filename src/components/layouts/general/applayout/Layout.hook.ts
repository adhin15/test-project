import { useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import Aos from "aos";

const useLayout = () => {
  const data = Cookies.get("MoFlixxUser") || "{}";
  const userData = JSON.parse(data);

  useEffect(() => {
    Aos.init({
      duration: 500,
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      userData: userData,
    }),
    [data]
  );

  return {
    contextValue,
  };
};

export default useLayout;
