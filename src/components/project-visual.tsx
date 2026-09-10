import Image from "next/image";

import { ShotGallery } from "@/components/shot-gallery";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/**
 * The panel beside each project.
 *
 * Real screenshots win when a project has them. Where there are none yet, a
 * purpose-built illustration draws what the project actually does — a seat
 * map, macro rings, a diagnostics run, a migration — rather than standing in
 * with a decorative gradient.
 *
 * The draw-in animations key off `[data-visible]`, which the Reveal wrapper
 * stamps on its root once the card scrolls into view.
 */
export function ProjectVisual({
  project,
  locale,
  variant = "tile",
}: {
  project: Project;
  locale: Locale;
  /** "tile" locks every panel to one aspect so a grid of cards lines up. */
  variant?: "tile" | "full";
}) {
  // In the grid a card shows its cover and nothing else. Without one it stays
  // deliberately blank — a placeholder waiting for the image that belongs
  // there, rather than a thumbnail standing in for it.
  if (variant === "tile") {
    return (
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-bg">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 90vw, 420px"
            className="object-cover"
          />
        ) : null}
      </div>
    );
  }

  return project.shots?.length ? (
    <Gallery project={project} locale={locale} variant={variant} />
  ) : (
    <AbstractPanel slug={project.slug} />
  );
}

/**
 * Purpose-built illustrations, keyed by slug. A project only gets one while it
 * has nothing real to show; screenshots or a live embed replace it.
 */
const ILLUSTRATIONS: Record<string, () => React.ReactElement> = {
  macromath: MacroRings,
  "hardware-diagnostics": DiagnosticsTerminal,
  "sf-cosmetics": Storefront,
};

export function hasIllustration(slug: string) {
  return slug in ILLUSTRATIONS;
}

function AbstractPanel({ slug }: { slug: string }) {
  const Visual = ILLUSTRATIONS[slug];
  if (!Visual) return null;

  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-bg p-5 sm:p-6">
      <Visual />
    </div>
  );
}

/* --------------------------------------------------------------------------
   SF Cosmetics — the catalogue, and the AI that fills a product in
   -------------------------------------------------------------------------- */
function Storefront() {
  const products = [
    { name: "w-3/5", price: "w-1/4", ai: false },
    { name: "w-4/5", price: "w-1/3", ai: true },
    { name: "w-1/2", price: "w-1/4", ai: false },
    { name: "w-2/3", price: "w-2/5", ai: false },
  ];

  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-xl bg-bg-subtle p-2.5"
          style={{ animation: `rise 400ms var(--ease-out) ${index * 80 + 200}ms both` }}
        >
          <div className="relative flex-1 rounded-lg bg-border-base">
            {product.ai ? (
              <span className="type-label absolute right-1.5 top-1.5 rounded-full bg-[#d4af37] px-1.5 py-0.5 text-[8px] text-black">
                IA
              </span>
            ) : null}
          </div>
          <div className={`h-1.5 rounded-full bg-border-strong ${product.name}`} />
          <div className={`h-1.5 rounded-full bg-border-base ${product.price}`} />
        </div>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Screenshots
   -------------------------------------------------------------------------- */
const PHONE_ASPECT = "aspect-[828/1792]";
const FRAME = "relative overflow-hidden rounded-xl bg-bg ring-1 ring-[var(--hairline)]";

function Gallery({
  project,
  locale,
  variant,
}: {
  project: Project;
  locale: Locale;
  variant: "tile" | "full";
}) {
  const shots = project.shots ?? [];
  const phones = shots.filter((shot) => shot.kind === "phone");
  const webs = shots.filter((shot) => shot.kind === "web");

  // In a tile every panel is boxed to the shared 5:4 so a grid of cards lines
  // up. Phone screens are narrow enough to sit three abreast; a browser shot
  // gets one, cropped to fill, because three would each be a postage stamp.
  if (variant === "tile") {
    if (phones.length > 0) {
      return (
        <div className="flex aspect-[5/4] w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-bg p-4">
          {phones.slice(0, 3).map((shot) => (
            <div key={shot.src} className={`${FRAME} ${PHONE_ASPECT} h-full w-auto`}>
              <Image
                src={shot.src}
                alt={shot.caption[locale]}
                fill
                sizes="140px"
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
      );
    }

    const [first] = webs;
    return (
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-bg">
        <Image
          src={first.src}
          alt={first.caption[locale]}
          fill
          sizes="(max-width: 640px) 90vw, 420px"
          className="object-cover object-left-top"
        />
      </div>
    );
  }

  return null;
}

/**
 * The screens on a project's own page: contained thumbnails under a heading,
 * not full-width slabs. A screenshot blown up to the column width dominates the
 * page without saying any more than a small one does.
 */
export function ProjectShots({
  project,
  locale,
  labels,
}: {
  project: Project;
  locale: Locale;
  labels: Dictionary["projects"];
}) {
  const shots = project.shots ?? [];
  const phones = shots.filter((shot) => shot.kind === "phone");
  const webs = shots.filter((shot) => shot.kind === "web");

  if (shots.length === 0) return null;

  const chrome = {
    closeLabel: labels.closeImage,
    previousLabel: labels.previousImage,
    nextLabel: labels.nextImage,
  };

  return (
    <div className="space-y-12">
      {phones.length > 0 ? (
        <ShotGroup title={labels.appScreens}>
          <ShotGallery shots={phones} locale={locale} kind="phone" {...chrome} />
        </ShotGroup>
      ) : null}

      {webs.length > 0 ? (
        <ShotGroup title={labels.onTheWeb}>
          <ShotGallery shots={webs} locale={locale} kind="web" {...chrome} />
        </ShotGroup>
      ) : null}
    </div>
  );
}

function ShotGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="type-label mb-5 text-center text-text-faint">{title}</h2>
      {children}
    </section>
  );
}

/* --------------------------------------------------------------------------
   MacroMath — macro tracking rings
   -------------------------------------------------------------------------- */
function MacroRings() {
  const rings = [
    { radius: 52, pct: 0.78, label: "Proteína" },
    { radius: 39, pct: 0.62, label: "Hidratos" },
    { radius: 26, pct: 0.45, label: "Gordura" },
  ];

  return (
    <div className="flex h-full items-center justify-center gap-7">
      <svg viewBox="0 0 140 140" className="h-full max-h-40 w-auto -rotate-90">
        {rings.map((ring) => {
          const length = 2 * Math.PI * ring.radius;
          return (
            <g key={ring.label}>
              <circle
                cx="70"
                cy="70"
                r={ring.radius}
                fill="none"
                stroke="var(--border)"
                strokeWidth="7"
              />
              <circle
                className="draw"
                cx="70"
                cy="70"
                r={ring.radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                style={
                  {
                    "--len": length,
                    "--off": length * (1 - ring.pct),
                  } as React.CSSProperties
                }
              />
            </g>
          );
        })}
      </svg>

      <ul className="space-y-2.5">
        {rings.map((ring) => (
          <li key={ring.label} className="flex items-baseline gap-2">
            <span className="tabular text-[15px] font-semibold">
              {Math.round(ring.pct * 100)}%
            </span>
            <span className="text-[13px] text-text-faint">{ring.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Hardware diagnostics — the CLI extraction step
   -------------------------------------------------------------------------- */
function DiagnosticsTerminal() {
  const lines = [
    { prompt: true, text: "python3 diag.py --export json" },
    { text: "cpu    Intel Core i5-8250U · 4C/8T" },
    { text: "mem    8 GiB DDR4" },
    { text: "disk   256 GB NVMe SSD" },
    { text: "board  LENOVO 20LS · SN 8FK2913" },
    { ok: true, text: "POST /api/inventory → 201 Created" },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border-base bg-bg-subtle">
      <div className="flex items-center gap-1.5 border-b border-border-base px-3 py-2">
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="ml-2 font-mono text-[10px] text-text-faint">debian live · tty1</span>
      </div>

      <div className="flex-1 space-y-1.5 p-3 font-mono text-[11px] leading-relaxed">
        {lines.map((line, index) => (
          <p
            key={line.text}
            className="truncate opacity-0 [animation-fill-mode:both]"
            style={{
              animation: `rise 400ms var(--ease-out) ${index * 90 + 300}ms both`,
            }}
          >
            {line.prompt ? <span className="text-text-faint">$ </span> : null}
            {line.ok ? <span className="text-emerald-500">✓ </span> : null}
            <span className={line.prompt || line.ok ? "text-text" : "text-text-muted"}>
              {line.text}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

