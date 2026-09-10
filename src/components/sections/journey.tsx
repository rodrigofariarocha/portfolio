import { Award, Trophy } from "lucide-react";

import { Timeline } from "@/components/timeline";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  certifications,
  education,
  experience,
  extracurricular,
} from "@/content/experience";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Journey({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="journey" tone="subtle">
      <SectionHeading
        eyebrow={dict.experience.eyebrow}
        heading={dict.experience.heading}
      />

      <div className="mt-12 max-w-3xl">
        <h3 className="type-label text-text-faint">{dict.experience.workHeading}</h3>
        <Timeline entries={experience} locale={locale} />

        <h3 className="type-label mt-14 text-text-faint">
          {dict.experience.educationHeading}
        </h3>
        <Timeline entries={education} locale={locale} />
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl bg-bg p-6">
            <h3 className="type-label flex items-center gap-2 text-text-faint">
              <Award aria-hidden className="size-3.5" />
              {dict.experience.certificationsHeading}
            </h3>
            <ul className="mt-5 space-y-3">
              {certifications.map((certification) => (
                <li key={certification.id}>
                  <p className="text-[15px] font-medium">{certification.name}</p>
                  <p className="mt-1 text-[14px] text-text-muted">
                    {certification.issuer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={50}>
          <div className="h-full rounded-2xl bg-bg p-6">
            <h3 className="type-label flex items-center gap-2 text-text-faint">
              <Trophy aria-hidden className="size-3.5" />
              {dict.experience.extrasHeading}
            </h3>
            <ul className="mt-5 space-y-3">
              {extracurricular.map((activity) => (
                <li key={activity.id}>
                  <p className="text-[15px] font-medium">{activity.name[locale]}</p>
                  <p className="mt-1 text-[14px] text-text-muted">
                    {activity.detail[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
