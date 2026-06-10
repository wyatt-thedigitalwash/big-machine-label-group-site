"use client";

import { useState } from "react";

export default function TourToggle({
  byDate,
  byArtist,
}: {
  byDate: React.ReactNode;
  byArtist: React.ReactNode;
}) {
  const [view, setView] = useState<"date" | "artist">("date");

  const buttonClass =
    "font-[family-name:var(--font-body)] text-[13px] uppercase border-none bg-transparent cursor-pointer p-0 transition-colors duration-200 ease-out";

  return (
    <>
      <div role="tablist" className="flex gap-6" style={{ marginBottom: 32 }}>
        <button
          role="tab"
          aria-selected={view === "date"}
          onClick={() => setView("date")}
          className={buttonClass}
          style={{
            letterSpacing: "0.15em",
            color: view === "date" ? "#FFFFFF" : "#717171",
          }}
        >
          By Date
        </button>
        <button
          role="tab"
          aria-selected={view === "artist"}
          onClick={() => setView("artist")}
          className={buttonClass}
          style={{
            letterSpacing: "0.15em",
            color: view === "artist" ? "#FFFFFF" : "#717171",
          }}
        >
          By Artist
        </button>
      </div>

      <div style={{ display: view === "date" ? "block" : "none" }}>
        {byDate}
      </div>
      <div style={{ display: view === "artist" ? "block" : "none" }}>
        {byArtist}
      </div>
    </>
  );
}
