"use client";

import { useMemo, useState } from "react";
import type { ImageItem, MediaImages, Video } from "@/types";

/**
 * Media Gallery (P1 — section A). Tabbed panel following TMDB's structure:
 *   Terpopuler (Most Popular) | Video | Gambar Latar (Backdrops) | Poster.
 * Videos play via the parent's shared VideoPlayer (NOT the legacy ModalPlayer).
 */
interface MediaGalleryProps {
  images?: MediaImages;
  videos?: Video[];
  isLoading?: boolean;
  /** Called when a video thumbnail is clicked, so the parent can open its player. */
  onPlayVideo?: (key: string) => void;
}

type TabKey = "popular" | "video" | "backdrops" | "posters";

const TABS: { key: TabKey; label: string }[] = [
  { key: "popular", label: "Terpopuler" },
  { key: "video", label: "Video" },
  { key: "backdrops", label: "Gambar Latar" },
  { key: "posters", label: "Poster" },
];

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const MediaGallery = ({
  images,
  videos,
  isLoading,
  onPlayVideo,
}: MediaGalleryProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("popular");

  // "Terpopuler" = top-voted backdrops (TMDB web shows most-voted backdrops here).
  const popular = useMemo(
    () =>
      [...(images?.backdrops ?? [])].sort((a, b) => b.vote_count - a.vote_count),
    [images?.backdrops]
  );

  const gallery: Record<TabKey, { file_path: string; vote_count?: number }[]> = {
    popular,
    video: [],
    backdrops: images?.backdrops ?? [],
    posters: images?.posters ?? [],
  };

  const isVideoTab = activeTab === "video";
  const items = isVideoTab ? videos : gallery[activeTab];
  const isEmpty = !items || items.length === 0;

  if (isLoading) {
    return (
      <div className="mt-8 animate-pulse">
        <div className="h-6 w-40 rounded bg-[var(--surface-2)] mb-4" />
        <div className="h-10 w-80 rounded-full bg-[var(--surface-2)] mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-video rounded bg-[var(--surface-2)]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="mt-8" aria-label="Media">
      <h3 className="font-bold text-2xl mb-4">Media</h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4" role="tablist">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--surface)] text-[var(--foreground)] opacity-70 hover:opacity-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {isEmpty ? (
        <p className="text-[var(--foreground)] opacity-60">
          {isVideoTab
            ? "Belum ada video untuk judul ini."
            : "Belum ada gambar untuk kategori ini."}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {isVideoTab
            ? (items as Video[])?.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => onPlayVideo?.(video.key)}
                  className="group relative aspect-video rounded overflow-hidden bg-[var(--surface)] text-left"
                  aria-label={`Putar ${video.name}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="text-[var(--foreground)]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs bg-black/70 truncate">
                    {video.name}
                  </span>
                </button>
              ))
            : (items as ImageItem[]).map((item, index) => (
                <a
                  key={index}
                  href={IMG_BASE + item.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-video rounded-lg overflow-hidden bg-[var(--surface)]"
                >
                  <img
                    src={IMG_BASE + item.file_path}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </a>
              ))}
        </div>
      )}
    </section>
  );
};

export default MediaGallery;
