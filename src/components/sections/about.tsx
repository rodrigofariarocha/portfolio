import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function About({ dict }: { dict: Dictionary }) {
  const { about } = dict;

  const facts = [
    { label: about.facts.grade, value: about.facts.gradeValue },
    { label: about.facts.qualification, value: about.facts.qualificationValue },
    { label: about.facts.languages, value: about.facts.languagesValue },
    { label: about.facts.based, value: about.facts.basedValue },
  ];

  return (
    <Section id="about" tone="subtle">
      <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="space-y-5">
          {about.body.map((paragraph, index) => (
            <Reveal key={index} delay={index * 60}>
              <p className="type-body text-pretty text-text-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <dl className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 50}>
              <div className="flex items-baseline justify-between gap-4 rounded-2xl bg-bg px-5 py-4">
                <dt className="type-label text-text-faint">{fact.label}</dt>
                <dd className="tabular text-right text-[15px] font-semibold">
                  {fact.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
