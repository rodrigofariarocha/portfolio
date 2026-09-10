import { Reveal } from "@/components/ui/reveal";
import { TechIcon } from "@/components/ui/tech-icon";
import type { TimelineEntry } from "@/content/experience";
import type { Locale } from "@/lib/i18n/config";

export function Timeline({
  entries,
  locale,
}: {
  entries: TimelineEntry[];
  locale: Locale;
}) {
  return (
    <ol className="mt-6 ml-5 border-l border-border-base">
      {entries.map((entry, index) => (
        <li key={entry.id} className="relative pb-14 pl-8 last:pb-0 sm:pl-10">
          {/* The monogram sits astride the rail — a marker that names the place
              instead of a dot that just marks a position. It stays outside
              Reveal, whose transform would become its containing block. */}
          <span
            aria-hidden
            className="absolute -left-5 top-0 grid size-10 place-items-center rounded-xl bg-bg-subtle text-[13px] font-semibold tracking-[-0.01em]"
          >
            {entry.monogram}
          </span>

          <Reveal delay={index * 60}>
            <p className="text-[12px] text-text-faint">
              <span className="tabular">{entry.period[locale]}</span>
              <span aria-hidden className="px-2">
                ·
              </span>
              <span>{entry.location[locale]}</span>
            </p>

            <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.015em]">
              {entry.organisation}
            </h3>
            <p className="mt-1 text-[14px] text-text-muted">{entry.role[locale]}</p>
            <p className="mt-4 text-pretty text-[14px] leading-relaxed text-text-muted">
              {entry.summary[locale]}
            </p>

            <ul className="mt-4 space-y-2.5">
              {entry.points[locale].map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[14px] leading-relaxed text-text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 size-1 shrink-0 rounded-full bg-text-faint"
                  />
                  <span className="text-pretty">{point}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full bg-bg-subtle px-3 py-1.5 text-[13px] text-text-muted"
                >
                  <TechIcon name={tag} className="size-3.5 shrink-0" />
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
