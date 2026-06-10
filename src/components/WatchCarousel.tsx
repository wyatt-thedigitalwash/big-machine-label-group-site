"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import VideoLightbox from "@/components/VideoLightbox";
import { artists } from "@/lib/data/artists";

const featured = artists
  .filter((a) => a.videos.length > 0)
  .map((a) => ({
    artistName: a.name,
    slug: a.slug,
    video: a.videos[0],
  }));

export default function WatchCarousel() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
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
    const el = carouselRef.current;
    if (!el) return;
    const step = 540;
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section
        data-bg="dark"
        className="relative"
        style={{
          backgroundColor: "#000000",
          padding: "48px 0",
        }}
      >
        <div className="px-8 md:px-20 md:py-8">
          <SectionHeader title="Watch" />
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto px-8 md:px-20 pb-4 hide-scrollbar"
            style={{ gap: 32, scrollBehavior: "smooth" }}
          >
            {featured.map((item) => (
              <button
                key={item.video.id}
                onClick={() => setActiveVideoId(item.video.id)}
                className="text-left bg-transparent border-none cursor-pointer p-0 flex-shrink-0 group w-[85vw] md:w-[min(520px,40vw)]"
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${item.video.id}/maxresdefault.jpg`}
                    alt={item.video.title}
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
                  style={{ fontSize: 13, color: "#CA2125" }}
                >
                  {item.artistName}
                </p>
                <span
                  className="block font-[family-name:var(--font-display)] text-white mt-2 uppercase"
                  style={{ fontSize: 28, lineHeight: 1.1 }}
                >
                  {item.video.title}
                </span>
                <p
                  className="font-[family-name:var(--font-body)] mt-2"
                  style={{ fontSize: 13, color: "#717171" }}
                >
                  {item.video.year}
                </p>
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
      </section>

      <VideoLightbox
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </>
  );
}
