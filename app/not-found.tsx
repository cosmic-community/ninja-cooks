import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <span className="text-8xl block mb-4">🥷</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
          404 — Lost in the Shadows
        </h1>
        <p className="text-ninja-300 text-lg max-w-md mx-auto mb-8">
          This page has vanished like a ninja in the night. Let&apos;s get you
          back to the dojo.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-flame hover:bg-flame-dark text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          🏠 Return to Dojo
        </Link>
      </div>
    </div>
  );
}