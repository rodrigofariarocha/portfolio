import type { ReactNode } from "react";

import { Reveal } from "./reveal";

export function Section({
  id,
  tone = "base",
  children,
}: {
  id?: string;
  /** Alternating page bands separate sections without drawing a single line. */
  tone?: "base" | "subtle";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-5 py-20 sm:py-28 ${
        tone === "subtle" ? "bg-bg-subtle" : "bg-bg"
      }`}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

/**
 * Label → title → supporting line, ranged left. The supporting line sits in a
 * second column on wide screens so the head reads as a masthead rather than a
 * stack of centred text.
 */
export function SectionHeading({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow: string;
  heading: string;
  subheading?: string;
}) {
  return (
    <header className="grid gap-x-12 gap-y-4 md:grid-cols-[1fr_20rem] md:items-end">
      <div>
        <Reveal>
          <p className="type-label flex items-center gap-3 text-text-faint">
            <span aria-hidden className="h-px w-8 bg-border-strong" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="type-title mt-5 max-w-xl text-balance">{heading}</h2>
        </Reveal>
      </div>

      {subheading ? (
        <Reveal delay={120}>
          <p className="text-pretty text-[16px] leading-relaxed text-text-muted">
            {subheading}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
