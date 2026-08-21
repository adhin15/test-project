import { getMovieRecommendations } from "@/services/Movies/api";
import { getTvRecommendations } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { Paginated, QueryOptions, TrendingItem } from "@/types";

const useGetRecommendations = ({
  payload,
  type = "movie",
}: QueryOptions<{ id: string }>) => {
  const id = payload?.id ?? "";
  const query = useQuery({
    queryFn: async (): Promise<Paginated<TrendingItem> | undefined> => {
      if (type === "movie") {
        return getMovieRecommendations({ id });
      }
      return getTvRecommendations({ id });
    },
    queryKey: ["detail-recommendations", { id, type }],
    enabled: !!id,
  });

  return query;
};

export default useGetRecommendations;
