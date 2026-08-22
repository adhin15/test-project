"use client";

import Aos from "aos";
import { useEffect, useMemo, useState } from "react";
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

/** A unified "Terpopuler" entry that can be either a still image or a video. */
type PopularItem =
  | { kind: "image"; key: string; file_path: string; vote_count: number }
  | { kind: "video"; key: string; videoKey: string; name: string; vote_count: number };

const MediaGallery = ({
  images,
  videos,
  isLoading,
  onPlayVideo,
}: MediaGalleryProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("popular");

  // "Terpopuler" = top 5 media items across ALL categories (backdrops, posters,
  // videos). Heuristic: TMDB's /images items carry a real `vote_count`, but the
  // /videos endpoint does NOT return vote data — so a pure vote sort would hide
  // videos entirely. We therefore rank images by popularity and guarantee the
  // video category is represented by reserving one slot for the best trailer
  // (official YouTube Trailer/Teaser, else the first video), filling the rest
  // with the top-voted images. Deliberate, documented mix.
  const popular = useMemo<PopularItem[]>(() => {
    const imagesList: PopularItem[] = [
      ...(images?.backdrops ?? []).map((img) => ({
        kind: "image" as const,
        key: `backdrop-${img.file_path}`,
        file_path: img.file_path,
        vote_count: img.vote_count ?? 0,
      })),
      ...(images?.posters ?? []).map((img) => ({
        kind: "image" as const,
        key: `poster-${img.file_path}`,
        file_path: img.file_path,
        vote_count: img.vote_count ?? 0,
      })),
    ];

    // Best available video: prefer official YouTube trailers/teasers.
    const videosList: PopularItem[] = (videos ?? [])
      .filter((v) => v.site === "YouTube")
      .sort((a, b) => {
        const rank = (t: string) =>
          t === "Trailer" ? 0 : t === "Teaser" ? 1 : 2;
        return rank(a.type) - rank(b.type);
      })
      .map((video) => ({
        kind: "video" as const,
        key: `video-${video.id ?? video.key}`,
        videoKey: video.key,
        name: video.name,
        vote_count: 0,
      }));

    const topImages = imagesList.sort((a, b) => b.vote_count - a.vote_count);
    const leadVideo = videosList[0];

    // Slot composition: lead video (if any) + 4 top images, dedup'd to 5.
    const mixed = leadVideo ? [leadVideo, ...topImages] : topImages;
    return mixed.slice(0, 5);
  }, [images?.backdrops, images?.posters, videos]);

  const gallery: Record<TabKey, { file_path: string; vote_count?: number }[]> = {
    popular: [],
    video: [],
    backdrops: images?.backdrops ?? [],
    posters: images?.posters ?? [],
  };

  const isVideoTab = activeTab === "video";
  const isPopularTab = activeTab === "popular";
  const items = isVideoTab ? videos : gallery[activeTab];
  const isEmpty = isPopularTab
    ? popular.length === 0
    : !items || items.length === 0;

  // AOS is init'd once at the layout level; the gallery items render after the
  // async data arrives, so re-scan the DOM for `data-aos` nodes whenever the
  // visible content or the active tab changes.
  useEffect(() => {
    Aos.refresh();
  }, [isLoading, activeTab, popular, items]);

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
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {isPopularTab
            ? popular.map((item, index) =>
                item.kind === "video" ? (
                  <div
                    key={item.key}
                    data-aos="fade-left"
                    data-aos-delay={`${index}00`}
                    className="shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => onPlayVideo?.(item.videoKey)}
                      className="group relative w-[220px] sm:w-[280px] aspect-video rounded overflow-hidden bg-[var(--surface)] text-left transition-transform duration-100 transform hover:scale-105"
                      aria-label={`Putar ${item.name}`}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${item.videoKey}/hqdefault.jpg`}
                        alt={item.name}
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
                        {item.name}
                      </span>
                    </button>
                  </div>
                ) : (
                  <div
                    key={item.key}
                    data-aos="fade-left"
                    data-aos-delay={`${index}00`}
                    className="shrink-0"
                  >
                    <a
                      href={IMG_BASE + item.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-video w-[220px] sm:w-[280px] rounded-lg overflow-hidden bg-[var(--surface)] transition-transform duration-100 transform hover:scale-105"
                    >
                      <img
                        src={IMG_BASE + item.file_path}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                )
              )
            : isVideoTab
              ? (items as Video[])?.map((video, index) => (
                  <div
                    key={video.id}
                    data-aos="fade-left"
                    data-aos-delay={`${index}00`}
                    className="shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => onPlayVideo?.(video.key)}
                      className="group relative w-[220px] sm:w-[280px] aspect-video rounded overflow-hidden bg-[var(--surface)] text-left transition-transform duration-100 transform hover:scale-105"
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
                  </div>
                ))
              : (items as ImageItem[]).map((item, index) => (
                  <div
                    key={index}
                    data-aos="fade-left"
                    data-aos-delay={`${index}00`}
                    className="shrink-0"
                  >
                    <a
                      href={IMG_BASE + item.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-video w-[220px] sm:w-[280px] rounded-lg overflow-hidden bg-[var(--surface)] transition-transform duration-100 transform hover:scale-105"
                    >
                      <img
                        src={IMG_BASE + item.file_path}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                ))}
        </div>
      )}
    </section>
  );
};

export default MediaGallery;
