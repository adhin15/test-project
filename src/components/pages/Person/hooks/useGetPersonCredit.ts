import {  getPersonCredit } from "@/services/Person/api";
import { useQuery } from "@tanstack/react-query";

const useGetPersonCredit = ({ payload = {}, onSuccess = () => {} }: any) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await getPersonCredit({id:payload?.id});

      return res;
    },
    queryKey: ["person-credit", {id:payload?.id}],
  });

  return query;
};

export default useGetPersonCredit;
