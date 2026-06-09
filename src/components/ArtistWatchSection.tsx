"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import VideoLightbox from "@/components/VideoLightbox";
import type { Video } from "@/lib/data/artists";

export default function ArtistWatchSection({ videos }: { videos: Video[] }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <>
      <section
        className="w-full bg-black px-8 py-12 md:px-20 md:py-20"
      >
        <SectionHeader title="Watch" />
        <div className="flex gap-8 overflow-x-auto pb-2 hide-scrollbar">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveVideoId(video.id)}
              className="text-left bg-transparent border-none cursor-pointer p-0 flex-shrink-0 group w-[85vw] md:w-[min(520px,40vw)]"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "16 / 9" }}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-250 ease-out">
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-out"
                    style={{ backgroundColor: "#CA2125" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 4L16 10L6 16V4Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <p
                className="font-[family-name:var(--font-body)] mt-4"
                style={{ fontSize: 12, color: "#717171" }}
              >
                {video.year}
              </p>
              <span
                className="block font-[family-name:var(--font-display)] text-white mt-2 uppercase"
                style={{ fontSize: 28, lineHeight: 1.1 }}
              >
                {video.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      <VideoLightbox
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </>
  );
}
