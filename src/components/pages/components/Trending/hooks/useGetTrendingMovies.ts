import { getTrendingMovies } from "@/services/Movies/api";
import { useQuery } from "@tanstack/react-query";

type payload = {
    timeWindow: 'day' | 'week'
}
const useGetTrendingMovieList = (
    payload: payload,   
    onError = () => {},
    onSuccess = () => {},) => {
    const query = useQuery({
      queryFn: async () => {
        const res = await getTrendingMovies(payload);
  
        return res;
      },
      queryKey: ['trending-movie-list', payload],
    });
  
    return query;
  };

  export default useGetTrendingMovieList;