"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const allPhotos = [
  { src: "/images/hero/big-machine-riley-green-hero.webp", alt: "Riley Green" },
  { src: "/images/hero/big-machine-rascal-flatts-hero.webp", alt: "Rascal Flatts" },
  { src: "/images/hero/big-machine-mackenzie-carpenter-hero.webp", alt: "Mackenzie Carpenter" },
  { src: "/images/hero/big-machine-greyland-james-hero.webp", alt: "Greyland James" },
  { src: "/images/hero/big-machine-caroline-jones-hero.webp", alt: "Caroline Jones" },
  { src: "/images/hero/big-machine-jack-wharff-band-hero.webp", alt: "The Jack Wharff Band" },
  { src: "/images/hero/big-machine-cole-goodwin-hero.webp", alt: "Cole Goodwin" },
  { src: "/images/hero/big-machine-shaylen-hero.webp", alt: "Shaylen" },
];

const cellIntervals = [5000, 8000, 11000, 7000, 13000, 9500];

// Each cell gets a unique sequence so no two cells ever show the same photo
// at the same cycle position. Shifted by 1 each row, offset by 2 each step.
const cellSequences = [
  [0, 6, 4, 2, 7, 1, 5, 3],
  [1, 7, 5, 3, 0, 2, 6, 4],
  [2, 0, 6, 4, 1, 3, 7, 5],
  [3, 1, 7, 5, 2, 4, 0, 6],
  [4, 2, 0, 6, 3, 5, 1, 7],
  [5, 3, 1, 7, 4, 6, 2, 0],
];

function GridCell({
  sequence,
  interval,
}: {
  sequence: number[];
  interval: number;
}) {
  const [step, setStep] = useState(0);
  const [prevStep, setPrevStep] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const pausedRef = useRef(false);

  const currentPhoto = allPhotos[sequence[step % sequence.length]];
  const prevPhoto =
    prevStep !== null ? allPhotos[sequence[prevStep % sequence.length]] : null;

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setFading(true);
      setTimeout(() => {
        setStep((prev) => {
          setPrevStep(prev);
          return prev + 1;
        });
        setTimeout(() => {
          setFading(false);
          setPrevStep(null);
        }, 1000);
      }, 0);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "#111111" }}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      {prevPhoto && (
        <Image
          src={prevPhoto.src}
          alt={prevPhoto.alt}
          fill
          className="object-cover object-center"
          style={{
            filter: "grayscale(100%)",
            opacity: fading ? 0 : 1,
            transition: "opacity 1000ms ease-out",
          }}
          sizes="(max-width: 767px) 33vw, 17vw"
        />
      )}
      <Image
        src={currentPhoto.src}
        alt={currentPhoto.alt}
        fill
        className="object-cover object-center"
        style={{
          filter: "grayscale(100%)",
          opacity: fading && prevPhoto ? 0 : 1,
          transition: "opacity 1000ms ease-out",
        }}
        sizes="(max-width: 767px) 33vw, 17vw"
      />
    </div>
  );
}

export default function AboutHero() {
  return (
    <section className="w-full bg-black min-h-screen md:h-screen md:grid md:grid-cols-2 md:overflow-hidden">
      {/* LEFT COLUMN */}
      <div
        className="flex flex-col justify-center px-8 pt-[100px] pb-10 md:py-20 md:px-[60px] md:pl-20"
        style={{
          animation: "aboutHeroLeftIn 700ms ease-out both",
        }}
      >
        <span
          className="font-[family-name:var(--font-body)] uppercase"
          style={{
            fontSize: 13,
            color: "#CA2125",
            letterSpacing: "0.2em",
            marginBottom: 24,
          }}
        >
          Since 2005.
        </span>

        <h1
          className="font-[family-name:var(--font-display)] uppercase text-white text-left"
          style={{ lineHeight: 0.95 }}
        >
          <span
            className="block text-[72px] md:text-[130px]"
          >
            Independent.
          </span>
          <span
            className="block text-[72px] md:text-[130px]"
          >
            Uncompromising.
          </span>
          <span
            className="block text-[72px] md:text-[130px]"
          >
            Nashville.
          </span>
        </h1>

        <div
          style={{
            width: 80,
            height: 1,
            background: "#333333",
            margin: "32px 0",
          }}
        />

        <p
          className="font-[family-name:var(--font-body)]"
          style={{
            fontSize: 16,
            color: "#C8C7C8",
            lineHeight: 1.7,
            maxWidth: 400,
          }}
        >
          Big Machine Records has been home to some of the most enduring artists
          in American music since 2005. Independent by design. Uncompromising by
          nature.
        </p>

        <Link
          href="#our-story"
          className="font-[family-name:var(--font-body)] uppercase no-underline transition-opacity duration-200 ease-out hover:opacity-70"
          style={{
            fontSize: 13,
            color: "#CA2125",
            letterSpacing: "0.12em",
            marginTop: 24,
          }}
        >
          Our Story
        </Link>
      </div>

      {/* RIGHT COLUMN — Photo Grid */}
      <div
        className="h-[320px] md:h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 2,
          animation: "aboutHeroRightIn 900ms ease-out 200ms both",
        }}
      >
        {cellSequences.map((sequence, i) => (
          <GridCell
            key={i}
            sequence={sequence}
            interval={cellIntervals[i]}
          />
        ))}
      </div>
    </section>
  );
}
