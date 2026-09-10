import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const iconButton =
  "pressable grid size-9 place-items-center rounded-full text-text-muted transition-colors duration-200 hover:bg-accent-soft hover:text-text";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    // Extra bottom padding on phones so the last line clears the tab bar.
    <footer className="border-t border-[var(--hairline)] px-5 pb-28 pt-10 md:pb-10">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
        <p className="text-[13px] text-text-faint">
          © {new Date().getFullYear()} {site.name} · {dict.footer.rights}
          <span aria-hidden className="px-2">
            ·
          </span>
          {dict.footer.built}
        </p>

        <div className="flex items-center gap-1">
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className={iconButton}
          >
            <GithubIcon aria-hidden className="size-4" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className={iconButton}
          >
            <LinkedinIcon aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
