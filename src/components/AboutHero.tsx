"use client";

export default function AboutHero() {
  return (
    <section className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center text-center">
        <span
          className="font-[family-name:var(--font-body)] text-[13px] uppercase mb-6"
          style={{
            letterSpacing: "0.2em",
            color: "#CA2125",
            animation: "heroFadeIn 800ms ease-out forwards",
            opacity: 0,
          }}
        >
          Since 2005
        </span>

        <h1
          className="font-[family-name:var(--font-display)] text-[64px] md:text-[140px] uppercase text-white leading-[1]"
          style={{
            letterSpacing: "-0.02em",
            animation: "heroFadeIn 800ms ease-out 300ms forwards",
            opacity: 0,
          }}
        >
          Built Different.
        </h1>

        <p
          className="font-[family-name:var(--font-body)] text-[14px] uppercase mt-8"
          style={{
            letterSpacing: "0.15em",
            color: "#717171",
            animation: "heroFadeIn 800ms ease-out 600ms forwards",
            opacity: 0,
          }}
        >
          Nashville, Tennessee
        </p>
      </div>
    </section>
  );
}
