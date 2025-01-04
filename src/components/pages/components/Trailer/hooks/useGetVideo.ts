

import { getMoviesVideo } from "@/services/Movies/api";
import { getTvVideo } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";

const useGetVideo = ({
  payload = {},
  onSuccess = () =>{},
  enabled = false,
  type = "movie"
}:any) => {
  const query = useQuery({
    queryFn: async () => {
      if(type === 'movie'){
        const res = await getMoviesVideo({id:payload?.id});
          return res;
      }else{
        const res = await getTvVideo({id:payload?.id});
          return res;

      }
      },
      queryKey: ['video-trailer',{id:payload?.id}],
      enabled: enabled,
    },);
  
    return query;
  };

  export default useGetVideo;