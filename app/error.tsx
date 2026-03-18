'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <span className="text-8xl block mb-4">🔥</span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Something went wrong!
        </h1>
        <p className="text-ninja-300 text-lg max-w-md mx-auto mb-8">
          The kitchen caught fire. Don&apos;t worry — even the best ninjas have
          off days.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-flame hover:bg-flame-dark text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
}