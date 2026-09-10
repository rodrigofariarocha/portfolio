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

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 50}>
              <ProjectTile project={project} locale={locale} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
