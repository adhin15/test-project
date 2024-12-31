

import { searchMovie } from "@/services/Movies/api";
import { searchTv } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";

const useSearchTv = ({
  payload = {},
  onSuccess = () =>{},
}:any) => {
  const query = useQuery({
    queryFn: async () => {
        const res = await searchTv(payload);
        return res;
    },
      queryKey: ['search-result-tv',payload],
    },);
  
    return query;
  };

  export default useSearchTv;