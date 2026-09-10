import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Every route renders inside this. The entrance animation replays on each
 * navigation because the page component remounts, which gives the tab switch
 * the same "the view arrived" feel a native app has.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="animate-[rise_420ms_var(--ease-out)_both] px-5 pb-24 pt-24 sm:pt-28 md:pb-20">
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </div>
  );
}

/** iOS-style large title: back affordance, then the title, then a lead line. */
export function PageHeader({
  title,
  lead,
  back,
}: {
  title: string;
  lead?: string;
  back?: { href: string; label: string };
}) {
  return (
    <header className="mb-10">
      {back ? (
        <Link
          href={back.href}
          className="pressable -ml-1.5 mb-5 inline-flex items-center gap-0.5 text-[15px] font-medium text-text-muted transition-colors duration-200 hover:text-text"
        >
          <ChevronLeft aria-hidden className="size-5" />
          {back.label}
        </Link>
      ) : null}

      <h1 className="type-title text-balance">{title}</h1>

      {lead ? (
        <p className="type-lead mt-4 max-w-2xl text-pretty text-text-muted">{lead}</p>
      ) : null}
    </header>
  );
}

/**
 * The inset grouped list from iOS Settings: rounded container, hairline
 * separators between rows, no outer border.
 */
export function ListGroup({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8">
      {label ? <h2 className="type-label mb-2.5 px-4 text-text-faint">{label}</h2> : null}
      <div className="overflow-hidden rounded-2xl bg-bg-subtle">
        <ul className="divide-y divide-[var(--hairline)]">{children}</ul>
      </div>
    </section>
  );
}

export function ListRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <li className={`px-4 py-3.5 ${className ?? ""}`}>{children}</li>;
}
