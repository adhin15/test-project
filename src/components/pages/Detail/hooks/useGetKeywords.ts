

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
        const res = await getMovieKeywords({id:payload?.id});
          return res?.keywords;
      }else{
        const res = await getTvKeywords({id:payload?.id});
          return res?.results;

      }
      },
      queryKey: ['keywords',{id:payload?.id}],
    },);
  
    return query;
  };

  export default useGetKeywords;