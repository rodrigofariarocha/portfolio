"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/logo";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { NAV_ITEMS, SECTION_IDS, hrefFor } from "@/lib/nav";

import { LocaleToggle } from "./ui/locale-toggle";
import { ThemeToggle } from "./ui/theme-toggle";

export function SiteNav({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const onHome = pathname === `/${locale}`;

  const [observed, setObserved] = useState<string | null>(null);

  // Off the home page we are always inside a project, so Work stays lit. That
  // is derived during render rather than pushed into state by an effect.
  const active = onHome ? (observed ?? "") : "work";

  useEffect(() => {
    if (!onHome) return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section nearest the top of the viewport wins, so the marker never
        // flickers between two that are both partly visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setObserved(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      // Back at the hero nothing below it is current; the observer only fires
      // on crossings, so without this the last section stays marked.
      if (window.scrollY < 160) setObserved("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onHome, pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-contrast"
      >
        {nav.skipToContent}
      </a>

      {/* Top bar. Translucent, with the page scrolling underneath it. */}
      <header className="material fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)]">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-5">
          <Link href={hrefFor(locale, "")} aria-label={nav.tabs.home} className="pressable">
            <Logo className="h-7 w-auto" />
          </Link>

          {/* Segmented control, the way iOS switches between peer views. */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full bg-accent-soft p-1">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.key}>
                    <Link
                      href={hrefFor(locale, item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-300 ${
                        isActive
                          ? "bg-bg text-text shadow-sm"
                          : "text-text-muted hover:text-text"
                      }`}
                    >
                      {nav.tabs[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <LocaleToggle locale={locale} label={nav.toggleLanguage} />
            <ThemeToggle label={nav.toggleTheme} />
          </div>
        </div>
      </header>

      {/* Bottom tab bar, phones only. Thumb-reachable, five destinations,
          translucent over the content — the iOS pattern. */}
      <nav
        aria-label="Sections"
        className="material fixed inset-x-0 bottom-0 z-50 border-t border-[var(--hairline)] pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="mx-auto flex max-w-lg items-stretch">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            const { Icon } = item;
            return (
              <li key={item.key} className="flex-1">
                <Link
                  href={hrefFor(locale, item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex flex-col items-center gap-1 py-2.5 transition-colors duration-200 ${
                    isActive ? "text-text" : "text-text-faint"
                  }`}
                >
                  <Icon
                    aria-hidden
                    className="size-[22px]"
                    strokeWidth={isActive ? 2.2 : 1.7}
                  />
                  <span className="text-[10px] font-medium tracking-[0.01em]">
                    {nav.tabs[item.key]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
