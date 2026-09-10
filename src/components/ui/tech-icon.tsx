import { Cloud, Code2, Database, Sparkles, type LucideIcon } from "lucide-react";
import {
  siAppstore,
  siAstro,
  siBootstrap,
  siCss,
  siDart,
  siDebian,
  siDotnet,
  siFlutter,
  siGit,
  siGithub,
  siGnubash,
  siGo,
  siGooglegemini,
  siGoogleplay,
  siHtml5,
  siJavascript,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siStripe,
  siSupabase,
  siTailwindcss,
  siThemoviedatabase,
  siTypescript,
  siVercel,
} from "simple-icons";

type Brand = { path: string; hex: string };

/**
 * Brand marks, keyed by the exact strings used in src/content.
 * Microsoft pulled its logos from Simple Icons over trademark policy, so those
 * fall through to LUCIDE below.
 */
const BRANDS: Record<string, Brand> = {
  React: siReact,
  "Next.js": siNextdotjs,
  Astro: siAstro,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  CSS3: siCss,
  "Tailwind CSS": siTailwindcss,
  Flutter: siFlutter,
  Dart: siDart,
  "Go (Golang)": siGo,
  Go: siGo,
  ".NET MVC": siDotnet,
  "ASP.NET Core 9": siDotnet,
  Razor: siDotnet,
  "C#": siDotnet,
  Python: siPython,
  PHP: siPhp,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  Git: siGit,
  GitHub: siGithub,
  Linux: siLinux,
  "Linux CLI": siGnubash,
  Debian: siDebian,
  "Debian Live": siDebian,
  Vercel: siVercel,
  Bootstrap: siBootstrap,
  "Google Gemini": siGooglegemini,
  "REST APIs": siOpenapiinitiative,
  "TMDB API": siThemoviedatabase,
  Supabase: siSupabase,
  Stripe: siStripe,
  "App Store": siAppstore,
  "Google Play": siGoogleplay,
};

const LUCIDE: Record<string, LucideIcon> = {
  "SQL Server": Database,
  SQL: Database,
  "Entity Framework Core": Database,
  "Entity Framework Core 9": Database,
  // Simple Icons only carries Apache Hive, which is a different product from
  // Flutter's local key-value store.
  Hive: Database,
  FatSecret: Database,
  "Open Food Facts": Database,
  "VS Code": Code2,
  Azure: Cloud,
  "IA / AI": Sparkles,
};

/**
 * Some brands are essentially black or white (Next.js, Vercel, GitHub), which
 * would vanish against one of the two themes. Those inherit the text colour
 * instead of painting their own.
 */
function isAchromatic(hex: string) {
  const value = parseInt(hex, 16);
  const [r, g, b] = [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const saturation = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
  return saturation < 0.12 || luminance < 0.14 || luminance > 0.94;
}

export function TechIcon({
  name,
  className,
  colored = false,
}: {
  name: string;
  className?: string;
  /** Paint the brand colour. Off by default so dense lists stay monochrome. */
  colored?: boolean;
}) {
  const brand = BRANDS[name];

  if (brand) {
    const fill = colored && !isAchromatic(brand.hex) ? `#${brand.hex}` : "currentColor";
    return (
      <svg viewBox="0 0 24 24" fill={fill} aria-hidden className={className}>
        <path d={brand.path} />
      </svg>
    );
  }

  const Fallback = LUCIDE[name];
  if (Fallback) return <Fallback aria-hidden className={className} />;

  return <Code2 aria-hidden className={className} />;
}

export function hasTechIcon(name: string) {
  return name in BRANDS || name in LUCIDE;
}

/**
 * Identifies the *glyph* a name resolves to, not the name itself. Several
 * technologies legitimately share one mark — ASP.NET Core, C# and Razor are all
 * the .NET logo — so a compact icon row can collapse them instead of repeating
 * the same shape five times.
 */
export function techIconKey(name: string) {
  const brand = BRANDS[name];
  if (brand) return `brand:${brand.hex}:${brand.path.slice(0, 24)}`;

  const fallback = LUCIDE[name];
  if (fallback) return `lucide:${fallback.displayName ?? name}`;

  return "generic";
}
