import { useEffect } from "react";
import useGetAccountDetail from "./hooks/useGetDetailAccount";
import Cookies from "js-cookie";

const LayoutProvider = () => {
  const data = Cookies.get("MoFlixxUser") || "{}";

  const userData = JSON.parse(data);

  const { mutate: detailData } = useGetAccountDetail({
    onError: () => {},
    onSuccess: (val: any) => {
      Cookies.set("MoFlixxUser", JSON.stringify({ ...val, session_id: userData?.session_id }));
    },
  });
  useEffect(() => {
    if (userData?.session_id) {
      detailData({ id: userData?.session_id });
    }
  }, []);

  return <></>;
};

export default LayoutProvider;
