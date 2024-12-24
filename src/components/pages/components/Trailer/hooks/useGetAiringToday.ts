
import { getAiringToday } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";


const useGetAiringToday = ( 
    onError = () => {},
    onSuccess = () => {},) => {
    const query = useQuery({
      queryFn: async () => {
        const res = await getAiringToday();
  
        return res;
      },
      queryKey: ['series-airing-today'],
    });
  
    return query;
  };

  export default useGetAiringToday;