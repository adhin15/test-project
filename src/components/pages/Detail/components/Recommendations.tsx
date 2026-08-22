"use client";

import Card from "@/components/shared/Card/Card";
import CardSkeleton from "@/components/shared/Skeleton";
import type { TrendingItem } from "@/types";

/**
 * Recommendations (P1 — section C) "If you liked...".
 * Uses `/movie/{id}/recommendations` & `/tv/{id}/recommendations` (NOT `/similar`).
 *
 * Layout mirrors the Trending section on the homepage (same card scroller and
 * Card component, so poster width/height are identical to Trending).
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

      {!isLoading ? (
        <>
          <div className="flex overflow-x-scroll w-full flex-nowrap px-4 py-4 fade-in">
            {items?.map((item, index) => {
              return (
                <div data-aos="fade-left" data-aos-delay={`${index}00`} key={index}>
                  <Card data={item} type={linkType} />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex overflow-x-scroll w-full flex-nowrap px-4 py-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </section>
  );
};

export default Recommendations;
