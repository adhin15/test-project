

import { getDetailMovie, getMovieReviews } from "@/services/Movies/api";
import { getDetailTv } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions } from "@/types";

const useGetMovieReviews = ({
  payload,
  onSuccess = () =>{},
  type = "movie"
}:QueryOptions<{ id: string; page: string }>) => {
  const query = useQuery({
    queryFn: async () => {
      if(type === 'movie'){
        const res = await getMovieReviews({id:payload?.id ?? "", page: payload?.page ?? ""});
          return res;
      }else{
        const res = await getMovieReviews({id:payload?.id ?? "", page: payload?.page ?? ""});
          return res;

      }
      },
      queryKey: ['detail-movie-tv',{id:payload?.id ?? "", page: payload?.page ?? ""}],
    },);
  
    return query;
  };

  export default useGetMovieReviews;