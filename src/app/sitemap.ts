import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) => [
    {
      url: `${site.url}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${site.url}/${locale}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]);
}
