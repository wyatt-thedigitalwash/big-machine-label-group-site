"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Video } from "@/lib/data/artists";

export default function VideoStrip({
  videos,
  onPlay,
}: {
  videos: Video[];
  onPlay: (videoId: string) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -540 : 540,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={stripRef}
        className="flex gap-8 overflow-x-auto pl-8 md:pl-20 pb-2 hide-scrollbar"
      >
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => onPlay(video.id)}
            className="text-left bg-transparent border-none cursor-pointer p-0 flex-shrink-0 group w-[85vw] md:w-[min(520px,40vw)]"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, min(520px, 40vw)"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/50 transition-all duration-250 ease-out">
                <div
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-out"
                  style={{ backgroundColor: "#CA2125" }}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 4L16 10L6 16V4Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
            <p
              className="font-[family-name:var(--font-body)] mt-4"
              style={{ fontSize: 13, color: "#717171" }}
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

      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-4 w-12 h-12 rounded-full items-center justify-center cursor-pointer z-10"
          style={{
            top: "calc(50% - 40px)",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.8)",
            border: "1px solid #333333",
          }}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-4 w-12 h-12 rounded-full items-center justify-center cursor-pointer z-10"
          style={{
            top: "calc(50% - 40px)",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.8)",
            border: "1px solid #333333",
          }}
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
