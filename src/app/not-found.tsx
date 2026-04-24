import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block rounded bg-black px-6 py-3 text-white hover:bg-gray-800 transition-colors"
      >
        Go Home
      </Link>
    </main>
  );
}
