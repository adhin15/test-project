

import { getDetailMovie } from "@/services/Movies/api";
import { getDetailTv } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";

const useGetDetailMovie = ({
  payload = {},
  onSuccess = () =>{},
  type = "movie"
}:any) => {
  const query = useQuery({
    queryFn: async () => {
      if(type === 'movie'){
        const res = await getDetailMovie({id:payload?.id});
          return res;
      }else{
        const res = await getDetailTv({id:payload?.id});
          return res;

      }
      },
      queryKey: ['video-trailer',{id:payload?.id}],
    },);
  
    return query;
  };

  export default useGetDetailMovie;