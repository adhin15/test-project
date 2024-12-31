

import { getMovieExternalIds } from "@/services/Movies/api";
import { getTvExternalIds } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";

const useGetExternalId = ({
  payload = {},
  onSuccess = () =>{},
  type = "movie"
}:any) => {
  const query = useQuery({
    queryFn: async () => {
      if(type === 'movie'){
        const res = await getMovieExternalIds(payload?.id);
          return res;
      }else{
        const res = await getTvExternalIds(payload?.id);
          return res;

      }
      },
      queryKey: ['external-id',payload?.id],
    },);
  
    return query;
  };

  export default useGetExternalId;