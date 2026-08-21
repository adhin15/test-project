import { getMovieImages } from "@/services/Movies/api";
import { getTvImages } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { MediaImages, QueryOptions } from "@/types";

const useGetImages = ({
  payload,
  type = "movie",
}: QueryOptions<{ id: string }>) => {
  const query = useQuery({
    queryFn: async (): Promise<MediaImages | undefined> => {
      if (type === "movie") {
        return getMovieImages({ id: payload?.id ?? "" });
      }
      return getTvImages({ id: payload?.id ?? "" });
    },
    queryKey: ["detail-media-images", { id: payload?.id ?? "", type }],
    enabled: !!payload?.id,
  });

  return query;
};

export default useGetImages;
