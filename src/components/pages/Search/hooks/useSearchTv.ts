

import { searchMovie } from "@/services/Movies/api";
import { searchTv } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions, SearchPayload } from "@/types";

const useSearchTv = ({
  payload = {},
  onSuccess = () =>{},
}:QueryOptions<SearchPayload>) => {
  const query = useQuery({
    queryFn: async () => {
        const res = await searchTv(payload);
        return res;
    },
      queryKey: ['search-result-tv',payload],
    },);
  
    return query;
  };

  export default useSearchTv;