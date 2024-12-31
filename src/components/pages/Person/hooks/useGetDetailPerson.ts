import { getDetailPerson } from "@/services/Person/api";
import { useQuery } from "@tanstack/react-query";

const useGetDetailPerson = ({ payload = {}, onSuccess = () => {}, type = "movie" }: any) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await getDetailPerson(payload?.id);

      return res;
    },
    queryKey: ["detail-person", payload?.id],
  });

  return query;
};

export default useGetDetailPerson;
