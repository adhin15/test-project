"use client";

import Aos from "aos";
import { useEffect, useMemo } from "react";
import ImageContainer from "@/components/shared/ImageContainer/ImageContainer";
import type { Paginated, Review } from "@/types";

/**
 * Ulasan / Reviews (P1 — section E).
 * Reads `/movie/{id}/reviews` & `/tv/{id}/reviews`.
 * The TMDB endpoint supports pagination via the `page` param (returns
 * `page` / `total_pages`), so we expose prev/next controls.
 */
interface ReviewsProps {
  reviews?: Paginated<Review>;
  isLoading?: boolean;
  page?: string;
  setPage?: (page: string) => void;
}

const IMG_BASE = "https://image.tmdb.org/t/p/w200";

const avatarSrc = (path: string | null): string | null => {
  // TMDB returns the literal string "null" (truthy) for missing avatar paths.
  if (!path || path === "null" || path.trim() === "") return null;
  // TMDB avatar_path can be a relative path or an absolute Gravatar URL.
  if (path.startsWith("/")) return IMG_BASE + path;
  return path;
};

const Reviews = ({ reviews, isLoading, page, setPage }: ReviewsProps) => {
  const list = useMemo(() => reviews?.results ?? [], [reviews?.results]);
  const currentPage = reviews?.page ?? Number(page ?? "1");
  const totalPages = reviews?.total_pages ?? 0;

  // AOS is init'd once at the layout level; the review items render after the
  // async data arrives (and re-render on pagination), so re-scan the DOM.
  useEffect(() => {
    Aos.refresh();
  }, [isLoading, list, currentPage]);

  const goTo = (target: number) => {
    if (!setPage) return;
    setPage(String(target));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

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
        {list.map((review, index) => {
          const avatar = avatarSrc(review.author_details?.avatar_path ?? null);
          return (
            <article
              key={review.id ?? index}
              data-aos="fade-up"
              data-aos-delay="300"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-3 mt-6"
          aria-label="Navigasi ulasan"
        >
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => goTo(currentPage - 1)}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--surface)] text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-80 transition-opacity"
          >
            Sebelumnya
          </button>
          <span className="text-sm opacity-70">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => goTo(currentPage + 1)}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--surface)] text-[var(--foreground)] disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:opacity-80 transition-opacity"
          >
            Berikutnya
          </button>
        </nav>
      )}
    </section>
  );
};

export default Reviews;
