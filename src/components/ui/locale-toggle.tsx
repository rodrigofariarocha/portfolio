"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/lib/i18n/config";

export function LocaleToggle({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");
  const activeIndex = locales.indexOf(locale);

  return (
    <div
      aria-label={label}
      className="relative flex h-8 items-center rounded-full bg-accent-soft p-0.5 text-[12px] font-medium"
    >
      {/* One pill sliding between the two options, instead of two colours
          cross-fading — the movement is what makes the switch legible. */}
      <span
        aria-hidden
        className="absolute left-0.5 top-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-bg shadow-sm transition-transform duration-300 ease-(--ease-sheet)"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}${rest}`}
          hrefLang={item}
          aria-current={item === locale ? "true" : undefined}
          className={`relative z-10 grid h-7 w-8 place-items-center rounded-full uppercase transition-colors duration-300 ${
            item === locale ? "text-text" : "text-text-faint hover:text-text-muted"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
