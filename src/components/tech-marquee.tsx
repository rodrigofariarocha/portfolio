import { TechIcon } from "@/components/ui/tech-icon";

const TECH = [
  "React",
  "Next.js",
  "Astro",
  "TypeScript",
  "Go (Golang)",
  "ASP.NET MVC",
  "C#",
  "C",
  "PostgreSQL",
  "Supabase",
  "Python",
  "Tailwind CSS",
  "Flutter",
  "Dart",
  "Node.js",
  "PHP",
  "Linux",
  "Debian",
  "Git",
  "Vercel",
];

/**
 * A continuously scrolling strip of the stack. The list is rendered twice so
 * the track can translate exactly -50% and loop without a seam.
 */
export function TechMarquee() {
  return (
    <div className="marquee marquee-mask overflow-hidden border-y border-[var(--hairline)] py-5">
      <div
        className="marquee-track flex w-max items-center"
        style={{ "--marquee-duration": "48s" } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center"
          >
            {TECH.map((name) => (
              <li
                key={name}
                className="flex shrink-0 items-center gap-2.5 px-6 text-text-faint"
              >
                <TechIcon name={name} className="size-5" />
                <span className="whitespace-nowrap text-[15px]">{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
