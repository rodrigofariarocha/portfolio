import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { ProjectVisual } from "@/components/project-visual";
import { TechIcon, techIconKey } from "@/components/ui/tech-icon";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n/config";

/** A whole-card link into the project's own page. */
export function ProjectTile({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: Locale;
  index: number;
}) {
  // One glyph per distinct mark: .NET Core, C# and Razor would otherwise print
  // the same logo three times in a five-icon row.
  const marks: string[] = [];
  const seen = new Set<string>();
  for (const tech of project.stack) {
    const key = techIconKey(tech);
    if (seen.has(key)) continue;
    seen.add(key);
    marks.push(tech);
  }

  return (
    <Link
      href={`/${locale}/work/${project.slug}`}
      className="group flex h-full flex-col gap-5 rounded-[24px] bg-bg-subtle p-4 transition-transform duration-300 ease-(--ease-out) sm:p-5 md:hover:-translate-y-1"
    >
      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col px-1 pb-1">
        <p className="flex items-center gap-2.5 text-[12px] text-text-faint">
          <span className="tabular">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden className="h-px w-5 bg-border-strong" />
          <span className="tabular">{project.year}</span>
        </p>

        <h3 className="type-heading mt-3">{project.name}</h3>
        <p className="mt-1.5 text-pretty text-[14px] leading-snug text-text-muted">
          {project.tagline[locale]}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <ul className="flex items-center gap-2.5">
            {marks.slice(0, 5).map((tech) => (
              <li key={tech} title={tech}>
                <TechIcon name={tech} colored className="size-[18px]" />
                <span className="sr-only">{tech}</span>
              </li>
            ))}
            {marks.length > 5 ? (
              <li className="tabular text-[12px] text-text-faint">
                +{marks.length - 5}
              </li>
            ) : null}
          </ul>

          <ChevronRight
            aria-hidden
            className="size-5 shrink-0 text-text-faint transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
