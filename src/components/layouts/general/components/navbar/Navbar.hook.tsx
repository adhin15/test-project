import { useGlobalContext } from "../../applayout/layout.context";
import usePostLogout from "./hooks/useLogout";
import Cookies from "js-cookie";

const useNavbar = () => {
  const { userData } = useGlobalContext();

  const { mutate: doLogout, isPending: isLogoutLoading } = usePostLogout({
    onError: () => {},
    onSuccess: () => {
      Cookies.remove("MoFlixxUser");
      window.location.replace("/");
    },
  });

  const handleLogout = () => {
    doLogout({ session_id: userData?.session_id });
  };
  return {
    handleLogout,
    isLogoutLoading,
  };
};

export default useNavbar;
