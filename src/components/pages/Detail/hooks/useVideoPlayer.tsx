"use client";

import { useCallback, useState } from "react";
import VideoPlayer from "@/components/shared/VideoPlayer/VideoPlayer";

/**
 * Shared video-player state for the detail page (P1 sections A & D).
 * Lets the hero "Play Trailer" button and the Media Gallery open the same
 * NEW VideoPlayer (NOT the legacy ModalPlayer).
 */
const useVideoPlayer = () => {
  const [playingKey, setPlayingKey] = useState<string | undefined>(undefined);

  const open = useCallback((key: string) => setPlayingKey(key), []);
  const close = useCallback(() => setPlayingKey(undefined), []);

  const player = (
    <VideoPlayer open={!!playingKey} youtubeKey={playingKey} onClose={close} />
  );

  return { open, close, player };
};

export default useVideoPlayer;
