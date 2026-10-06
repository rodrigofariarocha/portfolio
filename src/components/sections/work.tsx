import { ProjectTile } from "@/components/project-tile";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { projects } from "@/content/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Work({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow={dict.projects.eyebrow}
        heading={dict.projects.heading}
        subheading={dict.projects.subheading}
      />

      {/* A wrapping row rather than a grid, so a short last row sits centred
          (three over two) instead of leaving a gap on the right. */}
      <ul className="mt-12 flex flex-wrap justify-center gap-4">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <Reveal delay={index * 50} className="h-full">
              <ProjectTile project={project} locale={locale} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
