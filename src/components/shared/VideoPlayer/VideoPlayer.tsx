"use client";

import { useEffect } from "react";

/**
 * NEW video player for the detail page (P1). Deliberately does NOT reuse the
 * legacy ModalPlayer — this is a separate, self-contained implementation that
 * plays a YouTube video by key. Theme-aware (CSS variables), dark-only.
 */

interface VideoPlayerProps {
  open: boolean;
  youtubeKey?: string;
  onClose: () => void;
}

const VideoPlayer = ({ open, youtubeKey, onClose }: VideoPlayerProps) => {
  // Close on Escape for accessibility/UX parity.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while open.
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-[var(--surface)] rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup video"
          className="absolute top-2 right-2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-[var(--foreground)] hover:bg-black/80 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
        {youtubeKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
            title="Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-semibold text-[var(--foreground)] opacity-70">
              Video tidak tersedia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
