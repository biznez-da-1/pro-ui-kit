import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/60">404 · Page not found</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">This page isn&apos;t here.</h1>
      <p className="mt-3 max-w-md text-foreground/70">
        The link may be outdated, or the page may have moved. You can return to the component showcase or view the product preview.
      </p>
      <nav aria-label="Recovery links" className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex h-10 items-center rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          Component showcase
        </Link>
        <Link href="/product" className="inline-flex h-10 items-center rounded-xl border border-foreground/20 px-4 text-sm font-medium hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          Product preview
        </Link>
      </nav>
    </main>
  );
}
