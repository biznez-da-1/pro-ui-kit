"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep diagnostics in the browser console; never render internal error details to users.
    console.error("Pro UI Kit route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">Something went wrong</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">This page couldn't load.</h1>
      <p className="mt-3 max-w-md text-foreground/70">
        Try again. If the problem continues, return to the component showcase.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-10 items-center rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex h-10 items-center rounded-xl border border-foreground/20 px-4 text-sm font-medium hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Component showcase
        </a>
      </div>
    </main>
  );
}
