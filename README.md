<div align="center">

# Rodrigo Rocha — Portfolio

**A bilingual, statically generated personal portfolio built with Next.js 16, React 19 and Tailwind CSS v4.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-087EA4?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

[Live site](https://rodrigorocha.dev) · [LinkedIn](https://linkedin.com/in/rodrigo-faria-rocha-a90931404) · [GitHub](https://github.com/rodrigofariarocha)

</div>

---

## Overview

One scrolling page — hero, about, work, journey, stack, contact — plus a dedicated page for
each project. Every route is prerendered at build time in both Portuguese and English, so
the site ships as a set of static files with a single server action behind the contact form.

The design language is Apple's: monochrome, system-adjacent typography, translucent chrome,
restrained motion. There is **no animation library** — every transition is CSS, so nothing
competes with the main thread while the page loads. Client components are limited to the
theme and locale toggles, the mobile menu, the contact form, the scroll reveal and the
portrait's pointer tilt.

### Highlights

| | |
| --- | --- |
| 🌍 **Bilingual by default** | `Accept-Language` detection redirects to `/pt` or `/en`; both locales are prerendered, with `hreflang` alternates and canonical URLs. |
| 🎨 **Dark-first, dual theme** | Design tokens as CSS custom properties, reaching Tailwind through `@theme inline`. The light palette is the base; `.dark` overrides only what changes. |
| ⚡ **Static output** | `generateStaticParams` covers every route in every locale. No runtime data fetching on the critical path. |
| ♿ **Accessibility-aware motion** | `prefers-reduced-motion` and `prefers-reduced-transparency` are both honoured, and scroll reveals still work with JavaScript off. |
| 📬 **Working contact form** | A React server action plus [Resend](https://resend.com), with honeypot spam filtering and locale-agnostic error keys. |
| 🖼️ **Rich project pages** | A native `<dialog>` lightbox, live scrollable site embeds, and CSS/SVG illustrations for projects with no imagery yet. |
| 🔎 **SEO out of the box** | Generated OpenGraph cards, JSON-LD, `robots.ts` and `sitemap.ts`. |
| 📄 **Content, not components** | Everything editable lives in `src/content/` and one dictionary file, type-checked so a missing translation cannot ship. |

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) — App Router, server actions, every route prerendered |
| UI | [React 19](https://react.dev) with TypeScript in strict mode |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) over CSS custom properties |
| Theming | [`next-themes`](https://github.com/pacocoursey/next-themes) |
| Icons | [Lucide](https://lucide.dev) for the interface, [Simple Icons](https://simpleicons.org) for brands |
| Email | [Resend](https://resend.com) |
| Fonts | Poppins via `next/font` |
| Hosting | [Vercel](https://vercel.com) |

---

## Getting started

**Requirements:** Node.js `>=20.9` and npm.

```bash
git clone https://github.com/rodrigofariarocha/portfolio.git
cd portfolio
npm install
cp .env.example .env.local   # optional — only the contact form needs it
npm run dev
```

Open <http://localhost:3000>; the bare path redirects to `/pt` or `/en` based on your
browser's language.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build — prerenders every route in both locales |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint, via `eslint-config-next` |

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. The site builds and runs
without any of them; only the contact form and absolute metadata URLs depend on them.

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | For production | Origin used by metadata, OG tags, canonical URLs and the sitemap. |
| `RESEND_API_KEY` | For the contact form | Without it the form still validates, but tells visitors to use the direct email instead. |
| `CONTACT_FROM_EMAIL` | No | Verified Resend sender. Defaults to Resend's shared `onboarding@resend.dev`. |
| `CONTACT_TO_EMAIL` | No | Where messages land. Defaults to the address in `src/content/site.ts`. |

To turn the contact form on: create a free account at [resend.com](https://resend.com),
generate an API key, and put it in `RESEND_API_KEY`. Sending from your own domain requires
verifying it in Resend first — until then, keep the default sender.

---

## Project structure

```
src/
  app/
    [locale]/              # locale segment — also holds the root layout
      layout.tsx           # <html lang>, font, metadata, JSON-LD, nav, footer
      page.tsx             # the scrolling page: hero → about → work → journey → stack → contact
      work/[slug]/page.tsx # one page per project: gallery, highlights, links
      opengraph-image.tsx  # generated social preview card
      not-found.tsx
    actions/contact.ts     # server action behind the contact form
    globals.css            # design tokens, type scale, easing curves, keyframes
    robots.ts, sitemap.ts
  components/
    sections/              # hero, about, work, journey, stack, contact
    ui/                    # section, reveal, logo, toggles, tech + brand icons
    ...                    # nav, portrait, project tile/visual, timeline, gallery
  content/                 # the actual content — edit these, not the components
    site.ts                # name, role, email, links, CV path
    projects.ts            # one entry per project
    experience.ts          # timeline entries
    skills.ts              # stack groups
  lib/
    nav.ts                 # the five nav destinations, in one place
    squircle.ts            # the iOS superellipse mask
    contact-state.ts       # the shape the contact action returns
    i18n/                  # locale config + PT/EN dictionaries
  proxy.ts                 # locale detection and redirect (Next 16 proxy convention)
public/
  rodrigo.png              # portrait, 680x680 square crop
  Rodrigo-Rocha-CV.pdf     # the downloadable CV
  projects/<slug>/         # project screenshots and cover art
```

---

## Architecture notes

### Internationalization

`src/proxy.ts` reads `Accept-Language` and redirects bare paths to `/pt` or `/en`, falling
back to Portuguese. Both locales are prerendered at build time via `generateStaticParams`,
and each page declares `hreflang` alternates and a canonical URL.

Interface copy lives in `src/lib/i18n/dictionaries.ts`. The Portuguese dictionary defines
the shape and TypeScript fails the build if the English one drifts out of sync, so a missing
translation can't ship. Content fields in `src/content/` follow the same rule as `{ pt, en }`
pairs.

### Navigation

`src/lib/nav.ts` is the single source of truth for the five destinations. They are sections
of the home page, not routes: on desktop the nav is an iOS-style segmented control in the
translucent top bar, on phones a bottom tab bar above the safe-area inset, and both scroll
to the section. Five is the ceiling for a comfortable tab bar.

The active item comes from an `IntersectionObserver` over the sections. On a project page —
the one place that *is* a separate route — **Work** stays lit, derived during render rather
than pushed into state.

Anchor offset lives in exactly one place: `scroll-padding-top` on `html`. Sections
deliberately carry no `scroll-margin`, because the two stack and the target lands too low.

### Contact form

The server action in `src/app/actions/contact.ts` validates the submission, silently accepts
and discards anything that filled the honeypot field, and hands the message to Resend with
the sender's address as `replyTo`. It returns error *keys* rather than messages, so the
action stays locale-agnostic and the copy lives in the dictionary. React resets the form once
the action resolves, so the submitted values travel back in the returned state to be
restored.

With no `RESEND_API_KEY` configured the form degrades honestly: it still validates, then
points the visitor at the direct email address.

---

## Design notes

### Typography

Poppins throughout, at 400/500/600. The `next/font` class goes on `<html>`, not `<body>` —
`--font-sans` is declared on `:root`, and a `var()` inside a custom property is substituted
where the property is *declared*, not where it is used. Defined only on `<body>`,
`--font-poppins` is invisible to `:root`, which makes the whole `--font-sans` value invalid
and falls back silently. Grepping the CSS won't catch it; measure the rendered text instead.

Tracking is size-specific rather than one fixed value: the `.type-display` / `.type-title` /
`.type-body` / `.type-label` classes tighten as the text grows (`-0.025em` at display size,
`0` for body) and open up at small caps (`0.1em`). Poppins is a geometric sans with a wide
set width, so it needs less negative tracking than a grotesque would.

The one monospace left in the project is inside the diagnostics illustration, where the
terminal output *is* the content being depicted rather than a font choice.

### Colour

There is no accent hue. `--accent` is a *value*, not a colour — the highest-contrast surface
available, which is near-black in light mode and near-white in dark. The one place colour
appears is the Stack section, where brand logos paint themselves: on a monochrome page the
logos *become* the colour. Brands that are essentially black or white (Next.js, Vercel,
GitHub) inherit the text colour instead, so they never vanish into one of the two themes.
Red and green appear only as form status.

### Layers

Sections alternate between `--bg` and `--bg-subtle` bands instead of being divided by rules,
and every card sits on the opposite tone from its band so it stays legible in both themes.
The header is a translucent material (`backdrop-filter`) that content scrolls underneath,
and it only materializes once there is something behind it.

### Motion

- **Only `transform` and `opacity`** are animated — they skip layout and paint.
- **Custom easing curves** — `--ease-out: cubic-bezier(0.25, 1, 0.5, 1)` for entrances,
  `--ease-sheet: cubic-bezier(0.32, 0.72, 0, 1)` for anything that travels. `ease-in` is
  never used on UI.
- **Press feedback is instant** (120ms) and lives on `:active`, not on release.
- **Scroll reveals are CSS transitions** toggled by an `IntersectionObserver`, so they stay
  smooth while the page is still loading, and they fire once rather than on every scroll-by.
  Without JS, a `<noscript>` rule unlocks them.
- **Hover only changes the edge** of a card, never its fill — a fill change would fight
  whichever band the card is sitting on. Gated behind
  `@media (hover: hover) and (pointer: fine)`, because touch devices fire `:hover` on tap.
- **`prefers-reduced-motion`** removes movement while keeping opacity transitions, and
  **`prefers-reduced-transparency`** turns the translucent chrome solid.

### The portrait

`public/rodrigo.png` is a 680x680 square crop, centred on the face. To change it, overwrite
that file with another **square** image, head and shoulders, roughly centred; nothing else
needs changing.

It is clipped to an iOS squircle, not a rounded square. `src/lib/squircle.ts` generates a
superellipse (`|x|^5 + |y|^5 = 1`) as a CSS mask. `border-radius` joins straight edges to
circular corners and the eye catches the seam where the curvature jumps; a superellipse
curves continuously all the way round, which is why Apple's icons and hardware use it.

---

## Customising the content

Everything you would normally want to change lives in `src/content/` and
`src/lib/i18n/dictionaries.ts`. The CV is served from `public/Rodrigo-Rocha-CV.pdf` —
replace that file to update the download; the path is set in `src/content/site.ts`.

### Project screenshots

Drop image files in `public/projects/<slug>/`, then list them on the project in
`src/content/projects.ts`:

```ts
shots: [
  { src: "/projects/macromath/app/inicio.jpg", kind: "phone", caption: { pt: "Início", en: "Home" } },
  { src: "/projects/macromath/site.png",       kind: "web",   caption: { pt: "Site do produto", en: "Product site" } },
],
```

`kind` is per shot, not per project, because a product can be both an app and a website.
Phone screens render as a labelled row, browser shots as a row of three — both as contained
thumbnails rather than full-width slabs, which dominate a page without saying any more than
a small image does. Clicking one opens it full size.

The lightbox is built on the native `<dialog>` element, so focus trapping, Escape to close
and inertness of the page behind it come from the platform rather than from a pile of event
handlers. Arrow keys step through the group; a click that lands on the dialog itself — which
only happens on the backdrop, never on a child — closes it.

No width or height needed: `kind` declares the aspect (`828:1792` for phone, `16:10` for
web) and the image is cropped to fit, so swapping a file is a one-line change. `caption`
doubles as the alt text and as the label printed underneath, so keep it to a couple of words.

### Illustrations, covers and embeds

**Where a project has neither screenshots nor an embed**, a purpose-built illustration
stands in from `src/components/project-visual.tsx`, keyed by slug in the `ILLUSTRATIONS`
map: macro rings for MacroMath, a terminal for the diagnostics pipeline, a product grid for
SF Cosmetics. They are drawn in CSS and SVG, so they stay sharp and theme-aware.

Adding `shots` or an `embed` replaces the illustration automatically — a running site is
better proof than a drawing of one. A project with none of the three drops the media panel
entirely rather than leaving an empty box, so a slug with no entry in the map is a valid
state, not a missing case.

**Cover art** — a render, a key visual — goes on the project as `cover`:

```ts
cover: "/projects/macromath/cover.png",
```

A card in the work grid shows its cover and nothing else. Without one the panel stays
deliberately blank — a placeholder waiting for the image that belongs there, rather than a
thumbnail standing in for it. Every panel is locked to the same 5:4, so a grid of blanks and
covers still lines up.

**A live embed** puts the running site on the project's page, scrollable, inside a browser
frame:

```ts
embed: "https://csv-convert-virid.vercel.app/",
```

It is a plain iframe at container width, not a scaled-down desktop render: the site lays
itself out for the width it is given, and scrolling, links and form fields all behave
normally. A CSS transform would look more like a screenshot but make every pointer
coordinate lie. A button in the frame's title bar blows it up to a full window — traffic
lights, URL pill, Escape to close — for reading the site properly without leaving the page.

> [!IMPORTANT]
> An embed only works while the target site allows framing. A site that sends
> `X-Frame-Options: DENY` or a `frame-ancestors` CSP renders as a blank box, and nothing in
> this app can detect that from the outside. Check before adding one:
>
> ```bash
> curl -sI https://example.com | grep -iE 'x-frame-options|content-security-policy'
> ```

The frame is `loading="lazy"` so it costs nothing until scrolled to, and the URL above it is
a real link out, so the section still works if the frame ever goes blank.

### Extra links and technology logos

Anything beyond the repo and the live site — a demo video, a written report, a case study —
goes in the same file:

```ts
links: [{ label: { pt: "Relatório PAP", en: "Project report" }, href: "..." }],
```

Technology logos come from Simple Icons via `src/components/ui/tech-icon.tsx`, keyed by the
exact strings used in `src/content`. Microsoft pulled its brands from Simple Icons over
trademark policy, so C#, SQL Server, Azure and VS Code fall back to neutral Lucide glyphs.
If you add a technology and see a generic `</>`, add its key to that file.

---

## Deployment

Built for Vercel, but it is a standard Next.js app — anything that runs Next 16 works.

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is detected
   automatically, with no build settings to change.
3. Add the environment variables from `.env.example` in the project settings.
4. Set `NEXT_PUBLIC_SITE_URL` to the final domain so metadata, OG tags and the sitemap are
   correct.

---

## Featured work

The projects the site presents, for context on what it is showcasing:

| Project | What it is | Stack |
| --- | --- | --- |
| **[MacroMath](https://macromath.app)** | AI nutrition app shipped on the App Store and Google Play, with a marketing site, its own docs and a shared design system | Flutter · Dart · Supabase · Gemini · Astro · Stripe |
| **RochaCinema** | End-to-end cinema management and ticket booking platform — live seat selection, PDF tickets with QR codes, a loyalty programme | ASP.NET Core 9 · C# · EF Core · SQL Server |
| **Hardware Diagnostics Pipeline** | Erasmus+ internship in Athens: a bootable Debian diagnostics USB plus a browser-side converter feeding NGSI-LD entities to an Orion-LD broker | Astro · React · TypeScript · Python · Linux |
| **SF Cosmetics** | Cosmetics e-commerce with an AI-assisted admin panel that fills product records from plain-language descriptions | Next.js · TypeScript · Supabase · Gemini |

---

## License

The source is public for reference and learning. The personal content — the CV, the
portrait, project copy and screenshots — is mine and is not offered for reuse. If you want
to build on the structure, replace everything in `src/content/`, `public/rodrigo.png` and
`public/Rodrigo-Rocha-CV.pdf` first.

## Contact

**Rodrigo Rocha** — Full Stack Developer · Lisbon, Portugal

[rodrigo.faria.rocha.dev@gmail.com](mailto:rodrigo.faria.rocha.dev@gmail.com) ·
[LinkedIn](https://linkedin.com/in/rodrigo-faria-rocha-a90931404) ·
[GitHub](https://github.com/rodrigofariarocha)
