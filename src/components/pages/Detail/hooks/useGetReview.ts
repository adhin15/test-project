import { getMovieReviews } from "@/services/Movies/api";
import { getTvReviews } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { Paginated, QueryOptions, Review } from "@/types";

const useGetMovieReviews = ({
  payload,
  type = "movie",
}: QueryOptions<{ id: string; page: string }>) => {
  const query = useQuery({
    queryFn: async (): Promise<Paginated<Review> | undefined> => {
      if (type === "movie") {
        return getMovieReviews({
          id: payload?.id ?? "",
          page: payload?.page ?? "",
        });
      }
      return getTvReviews({ id: payload?.id ?? "", page: payload?.page ?? "" });
    },
    queryKey: ["detail-movie-tv", { id: payload?.id ?? "", page: payload?.page ?? "" }],
  });

  return query;
};

export default useGetMovieReviews;
