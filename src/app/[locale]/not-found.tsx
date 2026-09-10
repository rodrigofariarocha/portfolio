import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col justify-center px-6 sm:px-8">
      <p className="type-label text-text-faint">404</p>
      <h1 className="type-title mt-4">Page not found</h1>
      <p className="type-body mt-4 max-w-md text-text-muted">
        Esta página não existe / This page doesn&apos;t exist.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="pressable inline-flex rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-accent-contrast"
        >
          Início / Home
        </Link>
      </div>
    </section>
  );
}
