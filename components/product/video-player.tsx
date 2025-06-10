"use client";

import React, { useState, useRef } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

// --- Interfaces ---
export interface VerticalVideoPlayer {
  /** The source URL of the vertical video */
  src: string;
  /** Optional additional class names for the container */
  className?: string;
  /** Determines how the video should be resized to fit its container.
   * 'cover': Fills the entire container, cropping if necessary (default).
   * 'contain': Ensures the entire video is visible, adding letterboxes if necessary.
   */
  objectFit?: "cover" | "contain";
}

/**
 * A video player component designed for vertical videos that autoplays, loops,
 * and includes a mute/unmute control.
 */
export function VerticalVideoPlayer({
  src,
  className,
  objectFit = "cover",
}: VerticalVideoPlayerProps) {
  // The video MUST start muted to guarantee autoplay in modern browsers.
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Toggles the mute state of the video.
   */
  const toggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <div
      className={`relative w-full max-w-sm mx-auto aspect-[9/16] overflow-hidden rounded-2xl bg-black ${
        className || ""
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline // Crucial for autoplay on mobile browsers
        className={`h-full w-full ${
          objectFit === "cover" ? "object-cover" : "object-contain"
        }`}
      >
        Your browser does not support the video tag.
      </video>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 z-10 p-2 bg-black/40 text-white rounded-full transition-all hover:bg-black/60 backdrop-blur-sm"
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="h-6 w-6" />
        ) : (
          <SpeakerWaveIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}