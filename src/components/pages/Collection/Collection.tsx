"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollection } from "@/services/Collection/api";
import Card from "@/components/shared/Card/Card";
import type { MovieSummary, SeriesSummary } from "@/types";

interface CollectionViewProps {
  id: string;
}

const CollectionView = ({ id }: CollectionViewProps) => {
  const { data: collection, isLoading } = useQuery({
    queryKey: ["collection-page", { id }],
    queryFn: async () => getCollection({ id }),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-full py-5 px-6 md:px-12 animate-pulse">
        <div className="h-10 w-72 rounded bg-[var(--surface-2)] mb-4" />
        <div className="h-6 w-full max-w-xl rounded bg-[var(--surface-2)] mb-6" />
        <div className="flex overflow-x-auto gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[150px] aspect-[2/3] rounded bg-[var(--surface-2)]" />
          ))}
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="w-full max-w-full py-5 px-6 md:px-12">
        <p className="opacity-70">Koleksi tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full py-5 px-6 md:px-12">
      <h1 className="text-3xl font-bold">{collection.name}</h1>
      {collection.overview && (
        <p className="mt-2 max-w-2xl opacity-80">{collection.overview}</p>
      )}
      <div className="flex flex-wrap gap-4 mt-8">
        {collection.parts?.map((part, index) => (
          <Card
            key={`${part.id}-${index}`}
            data={part as SeriesSummary & MovieSummary}
            type={"title" in part ? "movie" : "tv-series"}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionView;
