

import { getMovieCastingList } from "@/services/Movies/api";
import { getTvCastingList } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions } from "@/types";

const useGetCastingList = ({
  payload,
  onSuccess = () =>{},
  type = "movie"
}:QueryOptions<{ id: string }>) => {
  const query = useQuery({
    queryFn: async () => {
      if(type === 'movie'){
        const res = await getMovieCastingList({id:payload?.id ?? ""});
          return res;
      }else{
        const res = await getTvCastingList({id:payload?.id ?? ""});
          return res;

      }
      },
      queryKey: ['casting-list',{id:payload?.id ?? ""}],
    },);
  
    return query;
  };

  export default useGetCastingList;