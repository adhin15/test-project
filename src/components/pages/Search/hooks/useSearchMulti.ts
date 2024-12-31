

import { searchMulti } from "@/services/General/api";
import { useQuery } from "@tanstack/react-query";

const useSearchMulti = ({
  payload = {},
  onSuccess = () =>{},
}:any) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await searchMulti(payload);
      return res;
    },
      queryKey: ['search-result-multi',payload],
    },);
  
    return query;
  };

  export default useSearchMulti;