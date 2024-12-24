import { getUpcomingMovies } from "@/services/Movies/api";
import { getAiringToday } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";


const useGetUpcomingMovieList = ({
    type = "movie"
  }:any
  ) => {
    const query = useQuery({
      queryFn: async () => {
        if(type === 'movie'){
          const res = await getUpcomingMovies();
          return res;
        }else{
          const res = await getAiringToday();
          return res;
        }
      },
      queryKey: ['movie-tv-list'],
      staleTime: 5000
    });
  
    return query;
  };

  export default useGetUpcomingMovieList;