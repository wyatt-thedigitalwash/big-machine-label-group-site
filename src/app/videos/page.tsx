"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import VideoLightbox from "@/components/VideoLightbox";
import VideoStrip from "@/components/VideoStrip";
import { artists } from "@/lib/data/artists";

const artistsWithVideos = artists.filter((a) => a.videos.length > 0);

export default function VideosPage() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <>
      <section
        data-bg="dark"
        className="min-h-screen pt-[100px] md:pt-[120px]"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="px-8 md:px-20">
          <SectionHeader title="Watch" as="h1" />
        </div>

        {artistsWithVideos.map((artist, sectionIndex) => (
          <div
            key={artist.slug}
            className="pb-12 md:pb-20"
            style={{
              borderTop: sectionIndex > 0 ? "1px solid #111111" : "none",
            }}
          >
            <div className="flex items-center pt-12 md:pt-16 px-8 md:px-20">
              <Link
                href={`/artists/${artist.slug}`}
                className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] text-white leading-none uppercase whitespace-nowrap no-underline transition-colors duration-300 ease-out hover:text-[#CA2125]"
              >
                {artist.name}
              </Link>
              <div
                className="flex-1 h-px ml-6"
                style={{ backgroundColor: "#222222" }}
              />
            </div>

            <div className="mt-8">
              <VideoStrip
                videos={artist.videos}
                onPlay={(id) => setActiveVideoId(id)}
              />
            </div>
          </div>
        ))}
      </section>

      <VideoLightbox
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </>
  );
}
