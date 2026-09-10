import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { TechIcon } from "@/components/ui/tech-icon";
import { skillGroups } from "@/content/skills";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Stack({ dict }: { dict: Dictionary }) {
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow={dict.skills.eyebrow}
        heading={dict.skills.heading}
        subheading={dict.skills.subheading}
      />

      <div className="mt-12 space-y-10">
        {skillGroups.map((group, groupIndex) => (
          <div key={group.key}>
            <Reveal delay={groupIndex * 40}>
              <div className="flex items-baseline gap-3 border-b border-[var(--hairline)] pb-3">
                <h3 className="type-label text-text">{dict.skills.groups[group.key]}</h3>
                <span className="tabular text-[12px] text-text-faint">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>

            <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {group.items.map((item, index) => (
                <Reveal key={item} delay={index * 30}>
                  <li className="group flex h-full items-center gap-3 rounded-2xl bg-bg-subtle px-4 py-3.5 transition-colors duration-300 hover:bg-accent-soft">
                    {/* Brand colour is the only colour on the page, and it only
                        shows up where the logo itself is the content. */}
                    <TechIcon
                      name={item}
                      colored
                      className="size-5 shrink-0 transition-transform duration-300 ease-(--ease-out) group-hover:scale-110"
                    />
                    <span className="text-[14px] font-medium leading-tight">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
