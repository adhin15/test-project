import { getDetailPerson } from "@/services/Person/api";
import type { QueryOptions } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetDetailPerson = ({ payload, onSuccess = () => {} }: QueryOptions<{ id: string }>) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await getDetailPerson({ id: payload?.id ?? "" });

      return res;
    },
    queryKey: ["detail-person", { id: payload?.id ?? "" }],
  });

  return query;
};

export default useGetDetailPerson;
