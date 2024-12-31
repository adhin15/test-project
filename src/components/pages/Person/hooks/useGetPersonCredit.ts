import {  getPersonCredit } from "@/services/Person/api";
import { useQuery } from "@tanstack/react-query";

const useGetPersonCredit = ({ payload = {}, onSuccess = () => {}, type = "movie" }: any) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await getPersonCredit(payload?.id);

      return res;
    },
    queryKey: ["person-credit", payload?.id],
  });

  return query;
};

export default useGetPersonCredit;
