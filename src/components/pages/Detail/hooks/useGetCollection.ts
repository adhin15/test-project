import { getCollection } from "@/services/Collection/api";
import { useQuery } from "@tanstack/react-query";
import type { CollectionDetail } from "@/types";

const useGetCollection = ({ id }: { id: string }) => {
  const query = useQuery({
    queryFn: async (): Promise<CollectionDetail | undefined> =>
      getCollection({ id }),
    queryKey: ["detail-collection", { id }],
    enabled: !!id,
  });

  return query;
};

export default useGetCollection;
