'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-600 mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-block rounded bg-black px-6 py-3 text-white hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-block rounded border border-black px-6 py-3 text-black hover:bg-gray-100 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
