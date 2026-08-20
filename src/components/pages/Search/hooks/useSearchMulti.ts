

import { searchMulti } from "@/services/General/api";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions, SearchPayload } from "@/types";

const useSearchMulti = ({
  payload = {},
  onSuccess = () =>{},
}:QueryOptions<SearchPayload>) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await searchMulti(payload);
      return res;
    },
      queryKey: ['search-result-multi',payload],
    },);
  
    return query;
  };

  export default useSearchMulti;