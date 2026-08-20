import { getPersonCredit } from "@/services/Person/api";
import type { QueryOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetPersonCredit = ({ payload, onSuccess = () => {} }: QueryOptions<{ id: string }>) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await getPersonCredit({ id: payload?.id ?? "" });

      return res;
    },
    queryKey: ["person-credit", { id: payload?.id ?? "" }],
  });

  return query;
};

export default useGetPersonCredit;
