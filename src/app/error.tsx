'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-center px-6">
      <h1
        className="font-[family-name:var(--font-display)] text-[120px] md:text-[200px] leading-none"
        style={{ color: "#CA2125" }}
      >
        Error
      </h1>
      <h2
        className="font-[family-name:var(--font-display)] text-[48px] uppercase text-white leading-none"
        style={{ marginTop: -16 }}
      >
        Something Went Wrong
      </h2>
      <p
        className="font-[family-name:var(--font-body)] text-[16px] mt-4"
        style={{ color: "#717171" }}
      >
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-6 mt-8">
        <button
          onClick={reset}
          className="font-[family-name:var(--font-body)] text-[14px] uppercase no-underline transition-opacity duration-200 ease-out hover:opacity-60 bg-transparent border-none cursor-pointer"
          style={{ color: "#CA2125", letterSpacing: "0.12em" }}
        >
          Try Again
        </button>
        <Link
          href="/"
          className="font-[family-name:var(--font-body)] text-[14px] no-underline transition-colors duration-300 ease-out hover:text-white"
          style={{ color: "#717171" }}
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
