import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-center px-6">
      <h1
        className="font-[family-name:var(--font-display)] text-[120px] md:text-[200px] leading-none"
        style={{ color: "#CA2125" }}
      >
        404
      </h1>
      <h2
        className="font-[family-name:var(--font-display)] text-[48px] uppercase text-white leading-none"
        style={{ marginTop: -16 }}
      >
        Page Not Found
      </h2>
      <Link
        href="/"
        className="font-[family-name:var(--font-body)] text-[14px] mt-8 no-underline transition-colors duration-300 ease-out hover:text-white"
        style={{ color: "#717171" }}
      >
        Return Home
      </Link>
    </main>
  );
}
