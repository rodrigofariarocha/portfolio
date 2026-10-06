import { notFound } from "next/navigation";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";
import { TechMarquee } from "@/components/tech-marquee";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <div className="after-intro animate-[rise_420ms_var(--ease-out)_both] px-5 pb-16 pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-5xl">
          <Hero dict={dict} locale={locale} />
        </div>
      </div>

      <TechMarquee />

      <About dict={dict} />
      <Work dict={dict} locale={locale} />
      <Journey dict={dict} locale={locale} />
      <Stack dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
