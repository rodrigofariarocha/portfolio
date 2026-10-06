import { Award, ExternalLink, Play, Trophy } from "lucide-react";
import Image from "next/image";

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
                  {/* The badge is the credential: the whole row opens it on Credly. */}
                  <a
                    href={certification.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group -m-2 flex items-center gap-4 rounded-xl p-2 transition-colors duration-300 hover:bg-accent-soft"
                  >
                    <Image
                      src={certification.badge}
                      alt=""
                      width={64}
                      height={64}
                      className="size-16 shrink-0"
                    />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium leading-snug">
                        {certification.name}
                      </span>
                      <span className="mt-1 block text-[14px] text-text-muted">
                        {certification.issuer} · {certification.issued[locale]}
                      </span>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] text-text-faint transition-colors duration-300 group-hover:text-text">
                        {dict.experience.viewCredential}
                        <ExternalLink aria-hidden className="size-3" />
                      </span>
                    </span>
                  </a>
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
                  {activity.video ? (
                    <a
                      href={activity.video}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] text-text-faint transition-colors duration-300 hover:text-text"
                    >
                      <Play aria-hidden className="size-3" />
                      {dict.experience.watchVideo}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
