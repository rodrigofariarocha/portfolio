import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/content/site";
import { isLocale, locales, localeTags, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

import "../globals.css";

/** Poppins has no variable build on Google Fonts, so the weights are explicit. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { meta } = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: `%s · ${site.name}` },
    description: meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.links.github }],
    creator: site.name,
    keywords: [
      "Rodrigo Rocha",
      "Full Stack Developer",
      "Next.js",
      "React",
      "Astro",
      "Go",
      "TypeScript",
      "Lisboa",
      "Portugal",
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((item) => [localeTags[item], `/${item}`]),
      ),
    },
    openGraph: {
      type: "website",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      locale: localeTags[locale].replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    url: site.url,
    image: `${site.url}/rodrigo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressCountry: "PT",
    },
    sameAs: [site.links.github, site.links.linkedin],
    knowsLanguage: ["pt-PT", "en"],
  };

  return (
    // The font variable must land on <html>, not <body>: --font-sans is declared
    // on :root and a var() inside a custom property resolves where it is
    // *declared*. Defined only on body, --font-poppins is invisible to :root,
    // which makes the whole --font-sans value invalid and silently falls back.
    <html
      lang={localeTags[locale]}
      className={poppins.variable}
      suppressHydrationWarning
    >
      <body>
        {/* Scroll reveals start at opacity 0 and are switched on by an observer.
            Without JS there is no observer, so unlock them outright. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Providers>
          <SiteNav locale={locale} nav={dict.nav} />
          <main id="main">{children}</main>
          <SiteFooter dict={dict} />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
