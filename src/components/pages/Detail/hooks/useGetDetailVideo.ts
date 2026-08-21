import { getMoviesVideo } from "@/services/Movies/api";
import { getTvVideo } from "@/services/Series/api";
import { useQuery } from "@tanstack/react-query";
import type { QueryOptions, Video } from "@/types";

const useGetDetailVideo = ({
  payload,
  enabled = false,
  type = "movie",
}: QueryOptions<{ id: string }> & { enabled?: boolean }) => {
  const id = payload?.id ?? "";
  const query = useQuery({
    queryFn: async (): Promise<{ results: Video[] } | undefined> => {
      if (type === "movie") {
        return getMoviesVideo({ id });
      }
      return getTvVideo({ id });
    },
    queryKey: ["detail-videos", { id, type }],
    enabled: enabled && !!id,
  });

  return query;
};

export default useGetDetailVideo;
