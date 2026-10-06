import Image from "next/image";

import type { Project } from "@/content/projects";

/**
 * The panel beside each project.
 *
 * Real screenshots win when a project has them. Where there are none yet, a
 * purpose-built illustration draws what the project actually does — a seat
 * map, macro rings, a diagnostics run, a storefront — rather than standing in
 * with a decorative gradient.
 *
 * The draw-in animations key off `[data-visible]`, which the Reveal wrapper
 * stamps on its root once the card scrolls into view.
 */
export function ProjectVisual({
  project,
  variant = "tile",
}: {
  project: Project;
  /** "tile" locks every panel to one aspect so a grid of cards lines up. */
  variant?: "tile" | "full";
}) {
  if (variant === "tile") return <Tile project={project} />;

  return <AbstractPanel slug={project.slug} />;
}

/**
 * A card's panel in the work grid, always 5:4 so the grid lines up.
 *
 * The project's logo sits small in the middle, on its own, on a panel washed
 * with a little of the project's brand colour. Without a logo, the cover image or the illustration stands in.
 */
function Tile({ project }: { project: Project }) {
  const Visual = ILLUSTRATIONS[project.slug];

  let content: React.ReactNode = null;

  if (project.logo) {
    content = <LogoMark src={project.logo} name={project.name} />;
  } else if (project.cover) {
    content = (
      <Image
        src={project.cover}
        alt={project.name}
        fill
        sizes="(max-width: 640px) 90vw, 460px"
        className="object-cover"
      />
    );
  } else if (Visual) {
    content = (
      <div className="absolute inset-0 p-5 sm:p-6">
        <Visual />
      </div>
    );
  }

  return (
    <div
      className="tile-wash relative aspect-[5/4] w-full overflow-hidden rounded-2xl"
      style={
        project.accent
          ? ({ "--tint": project.accent } as React.CSSProperties)
          : undefined
      }
    >
      {content}
    </div>
  );
}

function LogoMark({ src, name }: { src: string; name: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative size-14 drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-(--ease-out) sm:size-16 md:group-hover:-translate-y-1.5 md:group-hover:scale-[1.04]">
        <Image src={src} alt={name} fill sizes="64px" className="object-contain" />
      </div>
    </div>
  );
}

/**
 * Purpose-built illustrations, keyed by slug. A project only gets one while it
 * has nothing real to show; screenshots or a live embed replace it.
 */
const ILLUSTRATIONS: Record<string, () => React.ReactElement> = {
  macromath: MacroRings,
  rochacinema: SeatMap,
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
   RochaCinema — picking seats in a room
   -------------------------------------------------------------------------- */
function SeatMap() {
  const rows = 6;
  const columns = 10;
  // Seats already sold, and the two being picked, as "row-column".
  const taken = new Set(["0-2", "0-3", "1-6", "1-7", "2-0", "2-1", "3-4", "3-8", "4-2", "4-3", "4-4", "5-7", "5-8"]);
  const picked = new Set(["2-4", "2-5"]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="w-4/5">
        <div className="h-1.5 rounded-full bg-[var(--tint,var(--text))] opacity-80" />
        <div className="mx-auto mt-1 h-6 w-full bg-gradient-to-b from-[color-mix(in_oklab,var(--tint,var(--text))_22%,transparent)] to-transparent [clip-path:polygon(0_0,100%_0,90%_100%,10%_100%)]" />
      </div>

      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {Array.from({ length: rows * columns }, (_, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          const key = `${row}-${column}`;
          const state = picked.has(key) ? "picked" : taken.has(key) ? "taken" : "free";
          return (
            <span
              key={key}
              className={`size-3.5 rounded-t-[5px] rounded-b-[2px] sm:size-4 ${
                column === 5 ? "ml-2" : ""
              } ${
                state === "picked"
                  ? "bg-[var(--tint,var(--text))]"
                  : state === "taken"
                    ? "bg-border-strong"
                    : "bg-bg ring-1 ring-inset ring-[var(--hairline)]"
              }`}
              style={{ animation: `rise 400ms var(--ease-out) ${row * 60 + 200}ms both` }}
            />
          );
        })}
      </div>

      <p className="tabular rounded-full bg-bg px-3 py-1 text-[11px] text-text-muted shadow-sm">
        Sala 2 · Fila C · 5–6
      </p>
    </div>
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

