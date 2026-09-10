import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LivePreview } from "@/components/live-preview";
import {
  ProjectShots,
  ProjectVisual,
  hasIllustration,
} from "@/components/project-visual";
import { GithubIcon } from "@/components/ui/brand-icons";
import { PageHeader, PageShell } from "@/components/ui/page";
import { Reveal } from "@/components/ui/reveal";
import { TechIcon } from "@/components/ui/tech-icon";
import { projects } from "@/content/projects";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!isLocale(locale) || !project) return {};

  return {
    title: project.name,
    description: project.tagline[locale],
    alternates: { canonical: `/${locale}/work/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const dict = getDictionary(locale);
  const labels = dict.projects;
  const next = projects[(index + 1) % projects.length];

  // An illustration is a stand-in for having nothing to show. A live embed is
  // better proof than a drawing, so it replaces the drawing rather than joining it.
  const showIllustration =
    !project.shots?.length && !project.embed && hasIllustration(project.slug);

  // With none of the three there is nothing to frame, so the panel is dropped
  // rather than left as an empty box.
  const hasMedia =
    Boolean(project.shots?.length || project.embed) || showIllustration;

  const facts = [
    { label: labels.contextLabel, value: project.context[locale] },
    { label: labels.roleLabel, value: project.role[locale] },
    { label: labels.yearLabel, value: project.year },
  ];

  return (
    <PageShell>
      <PageHeader
        title={project.name}
        lead={project.tagline[locale]}
        back={{ href: `/${locale}#work`, label: labels.backToWork }}
      />

      {/* The explanation comes before the screenshots: what it is, then the
          facts, then proof. */}
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
        <div>
          <Reveal>
            <section>
              <h2 className="type-label text-text-faint">
                {labels.aboutHeading}
              </h2>
              <p className="type-lead mt-4 text-pretty text-text-muted">
                {project.description[locale]}
              </p>
            </section>
          </Reveal>

          <Reveal delay={60}>
            <section className="mt-12">
              <h2 className="type-label text-text-faint">
                {labels.highlightsLabel}
              </h2>
              {/* Numbered so a long list reads as a set of decisions rather
                  than a wall of bullets. */}
              <ol className="mt-5 space-y-4">
                {project.highlights[locale].map((highlight, position) => (
                  <li key={highlight} className="flex gap-4">
                    <span className="tabular mt-0.5 text-[13px] font-semibold text-text-faint">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="text-pretty text-[15px] leading-relaxed text-text-muted">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <section>
            <h2 className="type-label mb-2.5 px-4 text-text-faint">
              {labels.factsHeading}
            </h2>
            <dl className="divide-y divide-[var(--hairline)] overflow-hidden rounded-2xl bg-bg-subtle">
              {facts.map((fact) => (
                <div key={fact.label} className="px-4 py-3">
                  <dt className="text-[12px] text-text-faint">{fact.label}</dt>
                  <dd className="mt-1 text-[14px] leading-snug">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="type-label mb-2.5 mt-6 px-4 text-text-faint">
              {labels.stackLabel}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-full bg-bg-subtle px-3 py-1.5 text-[13px] text-text-muted"
                >
                  <TechIcon name={tech} colored className="size-4 shrink-0" />
                  {tech}
                </li>
              ))}
            </ul>

            <h2 className="type-label mb-2.5 mt-6 px-4 text-text-faint">
              {labels.linksLabel}
            </h2>
            <div className="space-y-2">
              {project.repo ? (
                <LinkButton href={project.repo} label={labels.viewCode} primary>
                  <GithubIcon aria-hidden className="size-4" />
                </LinkButton>
              ) : (
                <p className="inline-flex items-center gap-2 rounded-full bg-bg-subtle px-5 py-2.5 text-[14px] text-text-faint">
                  <Lock aria-hidden className="size-4" />
                  {labels.privateRepo}
                </p>
              )}

              {project.live ? (
                <LinkButton href={project.live} label={labels.viewLive} />
              ) : null}

              {project.links?.map((link) => (
                <LinkButton
                  key={link.href}
                  href={link.href}
                  label={link.label[locale]}
                />
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      {hasMedia ? (
        <Reveal>
          <div className="mt-14 space-y-12 rounded-[28px] bg-bg-subtle px-5 py-10 sm:px-8">
            {project.shots?.length ? (
              <ProjectShots project={project} locale={locale} labels={labels} />
            ) : null}

            {showIllustration ? (
              <div className="mx-auto max-w-md">
                <ProjectVisual
                  project={project}
                  locale={locale}
                  variant="full"
                />
              </div>
            ) : null}

            {project.embed ? (
              <section>
                <h2 className="type-label mb-5 text-center text-text-faint">
                  {labels.liveSite}
                </h2>
                <LivePreview
                  url={project.embed}
                  label={project.name}
                  expandLabel={labels.expandSite}
                  closeLabel={labels.closeSite}
                />
              </section>
            ) : null}
          </div>
        </Reveal>
      ) : null}

      <Reveal>
        <Link
          href={`/${locale}/work/${next.slug}`}
          className="group mt-16 flex items-center justify-between gap-6 rounded-[24px] bg-bg-subtle px-6 py-6 transition-transform duration-300 ease-(--ease-out) md:hover:-translate-y-1"
        >
          <span>
            <span className="type-label block text-text-faint">
              {labels.nextProject}
            </span>
            <span className="type-heading mt-2 block">{next.name}</span>
          </span>
          <ArrowRight
            aria-hidden
            className="size-5 shrink-0 text-text-faint transition-transform duration-300 ease-(--ease-out) group-hover:translate-x-1"
          />
        </Link>
      </Reveal>
    </PageShell>
  );
}

function LinkButton({
  href,
  label,
  primary,
  children,
}: {
  href: string;
  label: string;
  primary?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`pressable flex w-full items-center gap-2.5 rounded-full px-5 py-2.5 text-[14px] font-medium transition-colors duration-300 ${
        primary
          ? "bg-accent text-accent-contrast"
          : "bg-bg-subtle hover:bg-accent-soft"
      }`}
    >
      {children ?? <ExternalLink aria-hidden className="size-4" />}
      {label}
      <ExternalLink aria-hidden className="ml-auto size-3.5 opacity-50" />
    </a>
  );
}
