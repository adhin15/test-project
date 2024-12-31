

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
        const res = await getDetailMovie(payload?.id);
          return res;
      }else{
        const res = await getDetailTv(payload?.id);
          return res;

      }
      },
      queryKey: ['video-trailer',payload?.id],
    },);
  
    return query;
  };

  export default useGetDetailMovie;