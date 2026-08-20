

import { getMovieKeywords } from "@/services/Movies/api";
import { getTvKeywords } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions } from "@/types";

const useGetKeywords = ({
  payload,
  onSuccess = () =>{},
  type = "movie"
}:QueryOptions<{ id: string }>) => {
  const query = useQuery({
    queryFn: async () => {
      if(type === 'movie'){
        const res = await getMovieKeywords({id:payload?.id ?? ""});
          return res?.keywords;
      }else{
        const res = await getTvKeywords({id:payload?.id ?? ""});
          return res?.results;

      }
      },
      queryKey: ['keywords',{id:payload?.id ?? ""}],
    },);
  
    return query;
  };

  export default useGetKeywords;