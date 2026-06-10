"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const artistPhotos = [
  { src: "/images/grid/big-machine-riley-green-roster.webp", alt: "Riley Green" },
  { src: "/images/grid/big-machine-aaron-lewis-roster.webp", alt: "Aaron Lewis" },
  { src: "/images/grid/big-machine-mackenzie-carpenter-roster.webp", alt: "Mackenzie Carpenter" },
  { src: "/images/grid/big-machine-jack-wharff-band-roster.webp", alt: "The Jack Wharff Band" },
  { src: "/images/grid/big-machine-cole-goodwin-roster.webp", alt: "Cole Goodwin" },
  { src: "/images/grid/big-machine-caroline-jones-roster.webp", alt: "Caroline Jones" },
  { src: "/images/grid/big-machine-greyland-james-roster.webp", alt: "Greylan James" },
  { src: "/images/grid/Marfa_AboutBanner_Mobile.jpg", alt: "Marfa" },
  { src: "/images/grid/TheBandsPerryHero_Mobile.jpg", alt: "The Band Perry" },
  { src: "/images/grid/big-machine-savana-santos-roster.webp", alt: "Savana Santos" },
];

const CELL_COUNT = 6;

// One cell swaps at a time, cycling through cells 0-5 in order.
// The "reserve" pool holds the 3 photos not currently displayed.
// When a cell swaps, it puts its old photo back in reserve and takes one out.
function useGridState() {
  // Initial: cells 0-5 get photos 0-5, reserve is [6,7,8]
  const [cells, setCells] = useState(() =>
    Array.from({ length: CELL_COUNT }, (_, i) => i)
  );
  const [fadingCell, setFadingCell] = useState<number | null>(null);
  const reserveRef = useRef([6, 7, 8, 9]);
  const nextCellRef = useRef(0);

  useEffect(() => {
    const swap = () => {
      const cellIdx = nextCellRef.current;
      nextCellRef.current = (nextCellRef.current + 1) % CELL_COUNT;

      // Fade out
      setFadingCell(cellIdx);

      setTimeout(() => {
        setCells((prev) => {
          const next = [...prev];
          const oldPhotoIdx = next[cellIdx];
          const newPhotoIdx = reserveRef.current.shift()!;
          reserveRef.current.push(oldPhotoIdx);
          next[cellIdx] = newPhotoIdx;
          return next;
        });
        // Brief delay then fade back in
        setTimeout(() => setFadingCell(null), 80);
      }, 700);
    };

    const id = setInterval(swap, 2800);
    return () => clearInterval(id);
  }, []);

  return { cells, fadingCell };
}

export default function AboutHero() {
  const { cells, fadingCell } = useGridState();

  return (
    <section className="w-full bg-black md:grid md:grid-cols-2 md:overflow-hidden" style={{ minHeight: "100dvh" }}>
      {/* LEFT COLUMN */}
      <div
        className="flex flex-col justify-center px-8 pt-[100px] pb-10 md:py-20 md:px-[60px] md:pl-20"
        style={{
          animation: "aboutHeroLeftIn 700ms ease-out both",
        }}
      >
        <h1
          className="font-[family-name:var(--font-display)] uppercase text-white text-left"
          style={{ lineHeight: 0.95 }}
        >
          <span className="block text-[72px] md:text-[130px]">
            Independent.
          </span>
          <span className="block text-[72px] md:text-[130px]">
            Uncompromising.
          </span>
          <span className="block text-[72px] md:text-[130px]">
            Nashville.
          </span>
        </h1>

        <p
          className="font-[family-name:var(--font-body)]"
          style={{
            fontSize: 16,
            color: "#C8C7C8",
            lineHeight: 1.7,
            maxWidth: 400,
            marginTop: 32,
          }}
        >
          Big Machine Records has been home to some of the most enduring artists
          in American music since 2005. Independent by design. Uncompromising by
          nature.
        </p>
      </div>

      {/* RIGHT COLUMN -- Photo Grid */}
      <div
        className="h-[400px] md:h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 3,
          animation: "aboutHeroRightIn 900ms ease-out 200ms both",
        }}
      >
        {cells.map((photoIdx, cellIdx) => {
          const photo = artistPhotos[photoIdx];
          return (
            <div
              key={cellIdx}
              className="relative overflow-hidden"
              style={{ background: "#0a0a0a" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                style={{
                  objectPosition: "center 20%",
                  filter: "grayscale(100%)",
                  opacity: fadingCell === cellIdx ? 0 : 1,
                  transition: "opacity 700ms ease-in-out",
                }}
                sizes="(max-width: 767px) 33vw, 17vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
