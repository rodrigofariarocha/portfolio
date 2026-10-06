<div align="center">

# Rodrigo Rocha — Portfolio

**A bilingual, statically generated personal portfolio built with Next.js 16, React 19 and Tailwind CSS v4.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-087EA4?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

[Live site](https://rodrigorocha.dev) · [LinkedIn](https://linkedin.com/in/rodrigo-faria-rocha-a90931404) · [GitHub](https://github.com/rodrigofariarocha) · [Email](mailto:rodrigo.faria.rocha.dev@gmail.com)

<br />

<img src="docs/preview-light.png#gh-light-mode-only" alt="The portfolio's home page in light mode" width="100%" />
<img src="docs/preview-dark.png#gh-dark-mode-only" alt="The portfolio's home page in dark mode" width="100%" />

</div>

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Editing the content](#editing-the-content)
- [Architecture](#architecture)
- [Design system](#design-system)
- [Accessibility and performance](#accessibility-and-performance)
- [Deployment](#deployment)
- [Featured work](#featured-work)
- [License](#license)
- [Contact](#contact)

---

## Overview

The site is a single scrolling page plus a dedicated page for each project.

| Section | What it holds |
| --- | --- |
| **Hero** | Name, role, a one-line pitch, the portrait and the CV download |
| **About** | A short profile and four key facts: final grade, qualification, languages, location |
| **Work** | A grid of project cards, each opening its own page |
| **Journey** | Professional experience and education as timelines, certifications and extracurriculars |
| **Stack** | The technologies used day to day, grouped by layer |
| **Contact** | Direct channels and a working contact form |

Every route is prerendered at build time in **Portuguese and English**, so the site ships as
static files with a single server action behind the contact form.

The design language is Apple's: monochrome, restrained, translucent chrome, continuous-curve
corners. There is **no animation library** — every transition, including the entry sequence,
is plain CSS.

---

## Features

| | |
| --- | --- |
| 🌍 **Bilingual** | `Accept-Language` detection redirects to `/pt` or `/en`; both locales are prerendered, with `hreflang` alternates and canonical URLs. |
| 🎬 **Entry sequence** | The RR monogram draws itself, then glides into its slot in the nav bar. Pure CSS, once per session, skipped under reduced motion. |
| 🗂️ **Project pages** | Context, role, highlights, stack and links, then the proof — app screens, web screens, videos and the live site — behind tabs. |
| 🖥️ **Live embeds** | The running site, scrollable inside a browser frame, with a button that expands it to a full window. |
| 🖼️ **Lightbox** | Screenshots open full size in a native `<dialog>`, with keyboard navigation. |
| 🎨 **Light and dark** | Design tokens as CSS custom properties, reaching Tailwind through `@theme inline`. |
| 📬 **Contact form** | A React server action plus [Resend](https://resend.com), with validation, honeypot spam filtering and a graceful fallback. |
| 🔎 **SEO** | Generated OpenGraph cards per locale, JSON-LD `Person` schema, `robots.ts` and `sitemap.ts`. |
| ♿ **Accessible** | Semantic landmarks, a skip link, WAI-ARIA tabs, visible focus, `prefers-reduced-motion` and `prefers-reduced-transparency`. |
| 📄 **Content as data** | Everything editable lives in `src/content/` and one dictionary file, type-checked so a missing translation cannot ship. |

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) — App Router, server actions, Turbopack, every route prerendered |
| UI | [React 19](https://react.dev) with TypeScript in strict mode |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) over CSS custom properties |
| Theming | [`next-themes`](https://github.com/pacocoursey/next-themes) |
| Icons | [Lucide](https://lucide.dev) for the interface, [Simple Icons](https://simpleicons.org) for technology brands |
| Email | [Resend](https://resend.com) |
| Font | Poppins via `next/font` |
| Hosting | [Vercel](https://vercel.com) |

---

## Getting started

**Requirements:** Node.js `>=20.9` and npm.

```bash
git clone https://github.com/rodrigofariarocha/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # optional — only the contact form and metadata URLs need it
npm run dev
```

Open <http://localhost:3000>. The bare path redirects to `/pt` or `/en` based on the
browser's language.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build — prerenders every route in both locales |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint, via `eslint-config-next` |

> [!NOTE]
> This project uses Next.js 16, whose APIs and conventions differ from earlier versions —
> locale detection, for example, lives in `src/proxy.ts`, not `middleware.ts`. The guides
> bundled in `node_modules/next/dist/docs/` match the installed version.

---

## Environment variables

Copy `.env.example` to `.env.local`. The site builds and runs without any of them.

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | In production | Origin used by metadata, OG tags, canonical URLs and the sitemap. |
| `RESEND_API_KEY` | For the contact form | Without it the form still validates, then points visitors to the direct email. |
| `CONTACT_FROM_EMAIL` | No | Verified Resend sender. Defaults to Resend's shared `onboarding@resend.dev`. |
| `CONTACT_TO_EMAIL` | No | Where messages land. Defaults to the address in `src/content/site.ts`. |

To turn the contact form on, create a free account at [resend.com](https://resend.com),
generate an API key and set `RESEND_API_KEY`. Sending from your own domain requires verifying
it in Resend first; until then, keep the default sender.

---

## Project structure

```text
src/
├── app/
│   ├── [locale]/                 # locale segment — also holds the root layout
│   │   ├── layout.tsx            # <html lang>, font, metadata, JSON-LD, intro, nav, footer
│   │   ├── page.tsx              # hero → about → work → journey → stack → contact
│   │   ├── work/[slug]/page.tsx  # one page per project
│   │   ├── opengraph-image.tsx   # generated social preview card
│   │   └── not-found.tsx
│   ├── actions/contact.ts        # server action behind the contact form
│   ├── globals.css               # tokens, type scale, easing curves, keyframes
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── sections/                 # hero, about, work, journey, stack, contact
│   ├── ui/                       # section, reveal, logo, toggles, tech and brand icons
│   ├── intro.tsx                 # the entry sequence
│   ├── media-tabs.tsx            # tabbed media on project pages
│   ├── live-preview.tsx          # the embedded live site
│   ├── shot-gallery.tsx          # screenshots and the lightbox
│   ├── project-tile.tsx          # a card in the work grid
│   ├── project-visual.tsx        # the card's panel, and fallback illustrations
│   └── site-nav.tsx · site-footer.tsx · timeline.tsx · portrait.tsx · …
├── content/                      # the actual content — edit these, not the components
│   ├── site.ts                   # name, role, email, links, CV path
│   ├── projects.ts               # one entry per project
│   ├── experience.ts             # experience, education, certifications, extracurriculars
│   └── skills.ts                 # stack groups
├── lib/
│   ├── i18n/                     # locale config and the PT/EN dictionaries
│   ├── nav.ts                    # the five nav destinations
│   ├── squircle.ts               # the iOS superellipse mask
│   └── contact-state.ts          # the shape the contact action returns
└── proxy.ts                      # locale detection and redirect

public/
├── rodrigo.png                   # portrait, square crop
├── Rodrigo-Rocha-CV.pdf          # the downloadable CV
├── certifications/               # credential badges
└── projects/<slug>/              # logos and screenshots

docs/                             # README images
```

---

## Editing the content

Everything you would normally change lives in `src/content/` and
`src/lib/i18n/dictionaries.ts`. Text fields are `{ pt, en }` pairs.

### Projects

Each entry in `src/content/projects.ts` describes one project, in the order the grid shows
them. The last project's page ends with a link back to the site rather than wrapping round to
the first.

| Field | Purpose |
| --- | --- |
| `slug`, `name`, `year` | Identity and URL (`/pt/work/<slug>`) |
| `context`, `role`, `tagline`, `description` | The copy on the card and the project page |
| `highlights` | A numbered list of what was built |
| `stack` | Technology names; each needs a key in `src/components/ui/tech-icon.tsx` |
| `logo` | Transparent logo shown in the middle of the card |
| `accent` | Brand colour; the card's panel is washed with a little of it |
| `repo`, `live` | Links to the code and the running site |
| `embed` | A live URL shown scrollable on the project page (must allow framing) |
| `shots` | Screenshots, each with `kind: "phone" \| "web"` and a short caption |
| `videos` | YouTube videos by id, with a title and optional caption |
| `links` | Any extra links: documentation, a design system, a demo video |
| `notice` | A note shown above the links — a prototype, a host that sleeps |
| `cover` | A key visual for the card, used when there is no logo |

```ts
{
  slug: "bedsgone",
  name: "Bedsgone",
  logo: "/projects/bedsgone/logo.svg",
  accent: "#ff6a1f",
  live: "https://bedsgone-prototype.vercel.app/",
  embed: "https://bedsgone-prototype.vercel.app/",
  notice: { pt: "Protótipo para um cliente…", en: "A client prototype…" },
  // …
}
```

> [!IMPORTANT]
> An embed only works while the target site allows framing. A site that sends
> `X-Frame-Options: DENY` or a `frame-ancestors` CSP renders as a blank box. Check first:
>
> ```bash
> curl -sI https://example.com | grep -iE 'x-frame-options|content-security-policy'
> ```

### Experience, education and certifications

`src/content/experience.ts` holds the timelines and the cards beneath them. A certification
can carry a `badge` image and an `href` to the credential; an extracurricular can carry a
`video` link.

### Interface copy, CV and portrait

- **Copy** — `src/lib/i18n/dictionaries.ts`. The Portuguese dictionary defines the shape; the
  English one must match it or the build fails.
- **CV** — replace `public/Rodrigo-Rocha-CV.pdf`; the path is set in `src/content/site.ts`.
- **Portrait** — replace `public/rodrigo.png` with another square image, roughly centred.

---

## Architecture

### Internationalisation

`src/proxy.ts` reads `Accept-Language` and redirects bare paths to `/pt` or `/en`, falling
back to Portuguese. Both locales are prerendered through `generateStaticParams`, and each page
declares `hreflang` alternates and a canonical URL.

### Rendering

Every page is a Server Component, prerendered at build time. Client components are limited to
what needs the browser: the nav's active section, the theme and locale toggles, the scroll
reveal, the portrait's pointer tilt, the media tabs, the live preview, the lightbox and the
contact form.

### Navigation

`src/lib/nav.ts` is the single source of truth for the five destinations. On desktop the nav
is a segmented control in a translucent top bar; on phones it becomes a bottom tab bar above
the safe-area inset. The active item comes from an `IntersectionObserver` over the sections,
and on a project page **Work** stays lit.

### Project pages

A project page leads with the explanation — what it is, the facts, what was built — and puts
the proof after it. The proof is grouped into the app, the web, videos and the live site. One
group shows under its heading; two or more move behind a segmented control and show one at a
time. Each panel mounts the first time its tab is opened and then stays mounted, so the live
site and the videos only load when asked for and do not reload on every switch.

### Entry sequence

The first page load of a session opens on the RR monogram drawing itself stroke by stroke,
with the name underneath. It then glides and shrinks into its slot in the nav bar while the
page fades in around it, and hands over to the nav's own logo. It is CSS only: the strokes
draw through `pathLength`, and the slot is computed from the header's own layout, so it lands
on the real logo to the pixel at every width. A one-line inline script marks it as played in
`sessionStorage`. The timeline is documented above its keyframes in `globals.css`.

### Contact form

The server action validates the submission, silently discards anything that filled the
honeypot field, and sends the message through Resend with the sender as `replyTo`. It returns
error *keys* rather than messages, so the copy stays in the dictionary. Submitted values
travel back in the returned state, so a failed send never empties the form.

---

## Design system

**Colour.** Monochrome by design. `--accent` is a value, not a hue: the highest-contrast
surface available, near-black in light mode and near-white in dark. Colour comes from the
work itself — each project card is washed with its brand colour through `color-mix()`, and
technology logos paint their own brand colours.

**Typography.** Poppins at 400, 500 and 600. Tracking is size-specific: it tightens as text
grows and opens up at small caps.

**Shape.** The portrait is clipped to an iOS squircle — a superellipse generated in
`src/lib/squircle.ts` — rather than a rounded rectangle, so its curvature never jumps.

**Surfaces.** Sections alternate between two background bands instead of being divided by
rules, and every card sits on the opposite tone of its band.

**Motion.** Only `transform` and `opacity` are animated. Entrances use
`cubic-bezier(0.25, 1, 0.5, 1)` and anything that travels uses the iOS sheet curve. Scroll
reveals are CSS transitions toggled by an `IntersectionObserver` and fire once.

---

## Accessibility and performance

- Semantic landmarks, a skip-to-content link and one `h1` per page.
- WAI-ARIA tabs with arrow-key, Home and End navigation.
- The lightbox uses the native `<dialog>`, so focus trapping and Escape come from the platform.
- `prefers-reduced-motion` removes movement and skips the entry sequence;
  `prefers-reduced-transparency` makes the translucent chrome solid.
- Scroll reveals, the entry sequence and the layout all work with JavaScript disabled.
- Static output, `next/image` for every image, lazy iframes for embeds and videos, and
  YouTube served from `youtube-nocookie.com`.

---

## Deployment

The site is built for Vercel, but any host that runs Next.js 16 works.

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). The framework is detected
   automatically.
3. Add the environment variables from `.env.example` in the project settings.
4. Set `NEXT_PUBLIC_SITE_URL` to the final domain, so metadata, OG cards and the sitemap point
   at it.

Every push to `main` then deploys to production, and every other branch gets a preview URL.

---

## Featured work

| Project | What it is | Stack |
| --- | --- | --- |
| **[MacroMath](https://macromath.app)** | Final course project (19/20): an AI nutrition app for iOS and Android, with a marketing site, its own docs and a shared design system | Flutter · Dart · Supabase · Gemini · Astro · Stripe |
| **RochaCinema** | Cinema management and ticket booking platform — live seat selection, PDF tickets with QR codes, a loyalty programme | ASP.NET Core 9 · C# · EF Core · SQL Server |
| **[Bedsgone](https://bedsgone-prototype.vercel.app)** | Client prototype for a mattress pickup service — a hand-built three.js hero and a five-step booking wizard priced live | Astro · Tailwind CSS · three.js · GSAP |
| **[Hardware Diagnostics Pipeline](https://csv-convert-virid.vercel.app)** | Erasmus+ internship in Athens: a bootable Debian diagnostics USB plus a browser-side converter feeding NGSI-LD entities to an Orion-LD broker | Astro · React · TypeScript · Python · Linux |
| **[SF Cosmetics](https://sf-cosmetics.vercel.app/)** | Prototype cosmetics e-commerce with an AI-assisted admin panel that fills product records from plain-language descriptions | Next.js · TypeScript · Supabase · Gemini |

---

## License

The source code is public for reference and learning. The personal content — the CV, the
portrait, project copy, logos and screenshots — belongs to its owners and is not offered for
reuse. To build on the structure, replace everything in `src/content/`, `public/` and `docs/`
first.

## Contact

**Rodrigo Rocha** — Full Stack Developer · Lisbon, Portugal

[rodrigo.faria.rocha.dev@gmail.com](mailto:rodrigo.faria.rocha.dev@gmail.com) ·
[LinkedIn](https://linkedin.com/in/rodrigo-faria-rocha-a90931404) ·
[GitHub](https://github.com/rodrigofariarocha)
