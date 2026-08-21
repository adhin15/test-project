"use client";

import Link from "next/link";
import type { CollectionDetail } from "@/types";

/**
 * Collection banner (P1 — section F). "Bagian dari [Collection]" + "Lihat Koleksi".
 * Rendered only when the title's detail carries `belongs_to_collection`.
 */
interface CollectionBannerProps {
  collection?: CollectionDetail | null;
  isLoading?: boolean;
}

const IMG_BASE = "https://image.tmdb.org/t/p/original";

const CollectionBanner = ({ collection, isLoading }: CollectionBannerProps) => {
  if (isLoading) {
    return (
      <div className="mt-8 animate-pulse">
        <div className="h-28 rounded-lg bg-[var(--surface-2)]" />
      </div>
    );
  }

  if (!collection) return null;

  return (
    <section className="mt-8" aria-label="Koleksi">
      <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
        {collection.backdrop_path && (
          <img
            src={IMG_BASE + collection.backdrop_path}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-wide text-[var(--accent)] font-semibold">
              Bagian dari
            </p>
            <h3 className="text-2xl font-bold mt-1">{collection.name}</h3>
            {collection.overview && (
              <p className="mt-2 text-sm opacity-80 line-clamp-3">
                {collection.overview}
              </p>
            )}
          </div>
          <Link
            href={`/collection/${collection.id}`}
            className="px-5 py-2.5 rounded-lg font-semibold bg-[var(--accent)] text-[var(--accent-foreground)] hover:scale-105 transition-transform w-fit"
          >
            Lihat Koleksi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
