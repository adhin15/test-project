

import { searchMovie } from "@/services/Movies/api";
import { searchTv } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";

const useSearchMovie = ({
  payload = {},
  onSuccess = () =>{},
}:any) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await searchMovie(payload);
      return res;
    },
      queryKey: ['search-result-movie',payload?.id],
    },);
  
    return query;
  };

  export default useSearchMovie;