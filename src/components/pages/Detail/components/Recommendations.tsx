"use client";

import Card from "@/components/shared/Card/Card";
import type { TrendingItem } from "@/types";

/**
 * Recommendations (P1 — section C) "If you liked...".
 * Uses `/movie/{id}/recommendations` & `/tv/{id}/recommendations` (NOT `/similar`).
 */
interface RecommendationsProps {
  items?: TrendingItem[];
  type: "movie" | "tv";
  isLoading?: boolean;
  currentTitle?: string;
}

const Recommendations = ({
  items,
  type,
  isLoading,
  currentTitle,
}: RecommendationsProps) => {
  if (isLoading) {
    return (
      <section className="mt-8 animate-pulse">
        <div className="h-6 w-72 rounded bg-[var(--surface-2)] mb-4" />
        <div className="flex overflow-x-auto gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="min-w-[150px] aspect-[2/3] rounded bg-[var(--surface-2)]" />
          ))}
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) return null;

  const linkType = type === "movie" ? "movie" : "tv-series";

  return (
    <section className="mt-8" aria-label="Rekomendasi">
      <h3 className="font-bold text-2xl mb-4">
        {type === "movie" ? "Rekomendasi" : "Rekomendasi Serupa"}
      </h3>
      <p className="text-sm opacity-70 mb-4">
        If you liked{" "}
        <span className="font-semibold text-[var(--accent)]">{currentTitle}</span>
        , kamu mungkin juga suka:
      </p>
      <div className="flex overflow-x-auto gap-3 pb-2">
        {items.slice(0, 10).map((item, index) => (
          <Card key={`${item.id}-${index}`} data={item} type={linkType} />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
