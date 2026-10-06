import { ArrowRight, ExternalLink, Info, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LivePreview } from "@/components/live-preview";
import { MediaTabs, type MediaTab } from "@/components/media-tabs";
import { ProjectVisual, hasIllustration } from "@/components/project-visual";
import { ShotGallery } from "@/components/shot-gallery";
import { GithubIcon } from "@/components/ui/brand-icons";
import { PageHeader, PageShell } from "@/components/ui/page";
import { Reveal } from "@/components/ui/reveal";
import { TechIcon } from "@/components/ui/tech-icon";
import { projects, type Video } from "@/content/projects";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
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
  // The last project does not wrap round to the first: it hands the visitor
  // back to the site, at the section that follows the work grid.
  const next = projects[index + 1];
  const onward = next
    ? { href: `/${locale}/work/${next.slug}`, label: labels.nextProject, title: next.name }
    : { href: `/${locale}#journey`, label: labels.backToSite, title: dict.nav.tabs.journey };

  // An illustration is a stand-in for having nothing to show. A live embed is
  // better proof than a drawing, so it replaces the drawing rather than joining it.
  const showIllustration =
    !project.shots?.length && !project.embed && hasIllustration(project.slug);

  // Each kind of proof is one group: the app, the web, videos, the live site.
  const shots = project.shots ?? [];
  const phones = shots.filter((shot) => shot.kind === "phone");
  const webs = shots.filter((shot) => shot.kind === "web");
  const galleryLabels = {
    closeLabel: labels.closeImage,
    previousLabel: labels.previousImage,
    nextLabel: labels.nextImage,
  };

  const media: (MediaTab & { heading: string })[] = [];
  if (phones.length > 0) {
    media.push({
      id: "app",
      label: labels.appScreens,
      heading: labels.appScreens,
      content: <ShotGallery shots={phones} locale={locale} kind="phone" {...galleryLabels} />,
    });
  }
  if (webs.length > 0) {
    media.push({
      id: "web",
      label: labels.onTheWeb,
      heading: labels.onTheWeb,
      content: <ShotGallery shots={webs} locale={locale} kind="web" {...galleryLabels} />,
    });
  }
  if (project.videos?.length) {
    media.push({
      id: "video",
      label: labels.videos,
      heading: labels.videos,
      content: <VideoList videos={project.videos} locale={locale} />,
    });
  }
  if (project.embed) {
    media.push({
      id: "live",
      label: labels.liveTab,
      heading: labels.liveSite,
      content: (
        <LivePreview
          url={project.embed}
          label={project.name}
          expandLabel={labels.expandSite}
          closeLabel={labels.closeSite}
        />
      ),
    });
  }

  // With more than one group, the groups sit behind tabs and show one at a
  // time rather than stacking down the page under their own headings.
  const tabbed = media.length >= 2;

  // With nothing to frame the panel is dropped rather than left as an empty box.
  const hasMedia = media.length > 0 || showIllustration;

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
            {project.notice ? (
              <p className="mb-3 flex gap-2.5 rounded-2xl bg-bg-subtle px-4 py-3 text-pretty text-[13px] leading-relaxed text-text-muted">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-text-faint" />
                {project.notice[locale]}
              </p>
            ) : null}
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
            {showIllustration ? (
              <div className="mx-auto max-w-md">
                <ProjectVisual project={project} variant="full" />
              </div>
            ) : null}

            {tabbed ? (
              <MediaTabs tabs={media} label={labels.mediaLabel} />
            ) : (
              media.map((group) => (
                <section key={group.id}>
                  <h2 className="type-label mb-5 text-center text-text-faint">
                    {group.heading}
                  </h2>
                  {group.content}
                </section>
              ))
            )}
          </div>
        </Reveal>
      ) : null}

      <Reveal>
        <Link
          href={onward.href}
          className="group mt-16 flex items-center justify-between gap-6 rounded-[24px] bg-bg-subtle px-6 py-6 transition-transform duration-300 ease-(--ease-out) md:hover:-translate-y-1"
        >
          <span>
            <span className="type-label block text-text-faint">
              {onward.label}
            </span>
            <span className="type-heading mt-2 block">{onward.title}</span>
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

function VideoList({ videos, locale }: { videos: Video[]; locale: Locale }) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {videos.map((video) => (
        <figure key={video.id} className="m-0">
          <div className="overflow-hidden rounded-2xl bg-black ring-1 ring-[var(--hairline)]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0${video.start ? `&start=${video.start}` : ""}`}
              title={video.title[locale]}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block aspect-video w-full border-0"
            />
          </div>
          <figcaption className="mt-3 text-center text-[13px] text-text-muted">
            <span className="font-medium text-text">{video.title[locale]}</span>
            {video.caption ? <> — {video.caption[locale]}</> : null}
          </figcaption>
        </figure>
      ))}
    </div>
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
