import { ChevronRight, Mail, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Contact({ dict }: { dict: Dictionary }) {
  const channels = [
    { icon: Mail, label: site.email, href: `mailto:${site.email}`, external: false },
    { icon: Phone, label: site.phone, href: `tel:${site.phoneHref}`, external: false },
    {
      icon: GithubIcon,
      label: "github.com/rodrigofariarocha",
      href: site.links.github,
      external: true,
    },
    { icon: LinkedinIcon, label: "LinkedIn", href: site.links.linkedin, external: true },
  ];

  return (
    <Section id="contact" tone="subtle">
      <SectionHeading
        eyebrow={dict.contact.eyebrow}
        heading={dict.contact.heading}
        subheading={dict.contact.subheading}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal>
          <div>
            <h3 className="type-label mb-2.5 px-4 text-text-faint">
              {dict.contact.directHeading}
            </h3>
            {/* Inset grouped list, the way iOS presents a set of related rows. */}
            <ul className="divide-y divide-[var(--hairline)] overflow-hidden rounded-2xl bg-bg">
              {channels.map(({ icon: Icon, label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="flex items-center gap-3 px-4 py-3.5 text-[15px] transition-colors duration-200 hover:bg-accent-soft"
                  >
                    <Icon aria-hidden className="size-[18px] shrink-0 text-text-faint" />
                    <span className="truncate">{label}</span>
                    <ChevronRight
                      aria-hidden
                      className="ml-auto size-4 shrink-0 text-text-faint"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-[28px] bg-bg p-6 sm:p-8">
            <ContactForm labels={dict.contact.form} />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
