

import { getMovieKeywords } from "@/services/Movies/api";
import { getTvKeywords } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";

const useGetKeywords = ({
  payload = {},
  onSuccess = () =>{},
  type = "movie"
}:any) => {
  const query = useQuery({
    queryFn: async () => {
      if(type === 'movie'){
        const res = await getMovieKeywords(payload?.id);
          return res?.keywords;
      }else{
        const res = await getTvKeywords(payload?.id);
          return res?.results;

      }
      },
      queryKey: ['keywords',payload?.id],
    },);
  
    return query;
  };

  export default useGetKeywords;