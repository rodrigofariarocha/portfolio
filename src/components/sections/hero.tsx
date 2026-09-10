import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Stagger for the above-the-fold entrance. 60ms per step. */
const step = (index: number) => ({ animationDelay: `${index * 60}ms` });

const enter = "animate-[rise_600ms_var(--ease-out)_both]";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { hero } = dict;

  return (
    <section className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -top-24 -z-10 h-[30rem]"
        style={{
          background: "radial-gradient(60% 55% at 30% 0%, var(--sheen), transparent 72%)",
        }}
      />

      <div>
        <p
          style={step(0)}
          className={`${enter} inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[13px] text-text-muted`}
        >
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
          {hero.status}
        </p>

        <h1 style={step(1)} className={`${enter} type-display mt-6`}>
          {site.name}
        </h1>

        <p style={step(2)} className={`${enter} type-label mt-5 text-text-faint`}>
          {hero.role} · {hero.location}
        </p>

        <p
          style={step(3)}
          className={`${enter} type-lead mt-7 text-balance text-text-muted`}
        >
          {hero.headline}
        </p>

        <p
          style={step(4)}
          className={`${enter} type-body mt-4 max-w-xl text-pretty text-text-faint`}
        >
          {hero.intro}
        </p>

        <div style={step(5)} className={`${enter} mt-9 flex flex-wrap gap-3`}>
          <Link
            href={`/${locale}#work`}
            className="pressable group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-accent-contrast"
          >
            {hero.primaryCta}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-0.5"
            />
          </Link>
          <a
            href={site.cv}
            download
            className="pressable inline-flex items-center gap-2 rounded-full bg-accent-soft px-6 py-3 text-[15px] font-medium transition-colors duration-300 hover:bg-[var(--bg-subtle)]"
          >
            <Download aria-hidden className="size-4" />
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      <div
        style={step(3)}
        className={`${enter} relative mx-auto w-full max-w-[19rem] lg:max-w-none`}
      >
        <Portrait alt={`${site.name} — ${hero.role}`} />
      </div>
    </section>
  );
}
