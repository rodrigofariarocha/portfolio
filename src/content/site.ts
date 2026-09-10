export const site = {
  name: "Rodrigo Rocha",
  initials: "RR",
  role: "Full Stack Developer",
  email: "rodrigo.faria.rocha.dev@gmail.com",
  phone: "+351 911 571 408",
  phoneHref: "+351911571408",
  location: "Queijas, Lisboa, Portugal",
  cv: "/Rodrigo-Rocha-CV.pdf",
  /** Set to your deployed origin before going live — used for metadata and OG tags. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rodrigorocha.dev",
  links: {
    github: "https://github.com/rodrigofariarocha",
    linkedin: "https://linkedin.com/in/rodrigo-faria-rocha-a90931404",
  },
} as const;
