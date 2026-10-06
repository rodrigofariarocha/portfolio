import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Render both cards at build time instead of on the first share.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Social preview card. Mirrors the hero: same palette, same hierarchy. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "pt");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(255,255,255,0.09), transparent 70%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Holds the top slot, so the name stays centred between it and the footer row. */}
        <div style={{ display: "flex", height: 22 }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              color: "#f5f5f7",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 32,
              color: "#a1a1a6",
              letterSpacing: -0.5,
            }}
          >
            {site.role}
          </div>
          <div style={{ marginTop: 14, fontSize: 24, color: "#6e6e73" }}>
            {`${dict.hero.location} · React · Next.js · Astro · Go`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            borderTop: "1px solid #2c2c2e",
            paddingTop: 28,
            fontSize: 22,
            color: "#6e6e73",
          }}
        >
          <div>{site.email}</div>
          <div>github.com/rodrigofariarocha</div>
        </div>
      </div>
    ),
    size,
  );
}
