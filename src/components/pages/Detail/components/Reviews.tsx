"use client";

import ImageContainer from "@/components/shared/ImageContainer/ImageContainer";
import type { Review } from "@/types";

/**
 * Ulasan / Reviews (P1 — section E).
 * Reads `/movie/{id}/reviews` & `/tv/{id}/reviews`.
 */
interface ReviewsProps {
  reviews?: { results: Review[] };
  isLoading?: boolean;
}

const IMG_BASE = "https://image.tmdb.org/t/p/w200";

const avatarSrc = (path: string | null): string | null => {
  if (!path) return null;
  // TMDB avatar_path can be a relative path or an absolute Gravatar URL.
  if (path.startsWith("/")) return IMG_BASE + path;
  return path;
};

const Reviews = ({ reviews, isLoading }: ReviewsProps) => {
  const list = reviews?.results ?? [];

  if (isLoading) {
    return (
      <section className="mt-8 animate-pulse" aria-label="Ulasan">
        <div className="h-6 w-40 rounded bg-[var(--surface-2)] mb-4" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="mb-4 h-24 rounded bg-[var(--surface-2)]" />
        ))}
      </section>
    );
  }

  if (list.length === 0) return null;

  return (
    <section className="mt-8" aria-label="Ulasan">
      <h3 className="font-bold text-2xl mb-4">Ulasan</h3>
      <div className="flex flex-col gap-4">
        {list.slice(0, 4).map((review, index) => {
          const avatar = avatarSrc(review.author_details?.avatar_path ?? null);
          return (
            <article
              key={review.id ?? index}
              className="flex gap-3 rounded-lg bg-[var(--surface)] p-4 border border-[var(--border)]"
            >
              <div className="shrink-0">
                {avatar ? (
                  <ImageContainer
                    src={avatar}
                    width={48}
                    height={48}
                    alt=""
                    className="rounded-full overflow-hidden"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] flex items-center justify-center font-bold">
                    {(review.author || "?")[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">{review.author || "Anonim"}</span>
                  {review.author_details?.rating != null && (
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent)] text-[var(--accent-foreground)] font-semibold">
                      {review.author_details.rating}/10
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm opacity-80 line-clamp-4">
                  {review.content}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Reviews;
