

import { getTrendingSeries } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";

type payload = {
    timeWindow: 'day' | 'week'
}
const useGetTrendingSeriesList = (
    payload: payload,   
    onError = () => {},
    onSuccess = () => {},) => {
    const query = useQuery({
      queryFn: async () => {
        const res = await getTrendingSeries(payload);
  
        return res;
      },
      queryKey: ['trending-series-list', payload],
    });
  
    return query;
  };

  export default useGetTrendingSeriesList;