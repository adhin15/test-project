"use client";

/**
 * "Play Trailer" button for the hero (P1 — section D).
 * Plays the first official trailer by opening the shared VideoPlayer via `onPlay`.
 * Conditionally rendered only when a trailer exists.
 */
interface PlayTrailerButtonProps {
  onPlay?: () => void;
  hasTrailer?: boolean;
}

const PlayTrailerButton = ({ onPlay, hasTrailer }: PlayTrailerButtonProps) => {
  if (!hasTrailer) return null;

  return (
    <button
      type="button"
      onClick={onPlay}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[var(--accent)] text-[var(--accent-foreground)] hover:scale-105 transition-transform"
      aria-label="Putar trailer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-play-fill"
        viewBox="0 0 16 16"
      >
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
      </svg>
      Play Trailer
    </button>
  );
};

export default PlayTrailerButton;
