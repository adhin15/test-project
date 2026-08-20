

import { searchMovie } from "@/services/Movies/api";
import { searchTv } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions, SearchPayload } from "@/types";

const useSearchMovie = ({
  payload = {},
  onSuccess = () =>{},
}:QueryOptions<SearchPayload>) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await searchMovie(payload);
      return res;
    },
      queryKey: ['search-result-movie', payload],
    },);
  
    return query;
  };

  export default useSearchMovie;