import type { Locale } from "@/lib/i18n/config";

type Localized = Record<Locale, string>;

export type TimelineEntry = {
  id: string;
  organisation: string;
  /** Initials shown in the marker on the timeline rail. */
  monogram: string;
  location: Localized;
  period: Localized;
  role: Localized;
  summary: Localized;
  points: Record<Locale, string[]>;
  tags: string[];
};

export const experience: TimelineEntry[] = [
  {
    id: "unicage",
    organisation: "Unicage",
    monogram: "U",
    location: { pt: "Lisboa, Portugal", en: "Lisbon, Portugal" },
    period: { pt: "Abr 2026 — Jul 2026", en: "Apr 2026 — Jul 2026" },
    role: { pt: "Estagiário / Full Stack Developer", en: "Intern / Full Stack Developer" },
    summary: {
      pt: "Migração e modernização de uma plataforma web em produção.",
      en: "Migration and modernisation of a production web platform.",
    },
    points: {
      pt: [
        "Integração na equipa responsável pela migração da plataforma mytherapyspaces de Next.js para Astro e Go (Golang).",
        "Desenvolvimento e otimização de arquiteturas de backend com PostgreSQL e Go, com foco em garantir a performance do sistema.",
      ],
      en: [
        "Joined the team migrating the mytherapyspaces platform from Next.js to Astro and Go (Golang).",
        "Built and optimised backend architectures with PostgreSQL and Go, focused on system performance.",
      ],
    },
    tags: ["Astro", "Go", "PostgreSQL", "Next.js"],
  },
  {
    id: "epanekkinisis",
    organisation: "Epanekkinisis",
    monogram: "E",
    location: { pt: "Atenas, Grécia", en: "Athens, Greece" },
    period: { pt: "Abr 2026 — Mai 2026", en: "Apr 2026 — May 2026" },
    role: {
      pt: "IT & Software Developer Intern — Erasmus+",
      en: "IT & Software Developer Intern — Erasmus+",
    },
    summary: {
      pt: "Estágio internacional: automação de diagnóstico de hardware de ponta a ponta.",
      en: "International internship: end-to-end hardware diagnostics automation.",
    },
    points: {
      pt: [
        "Desenvolvimento, em equipa com mais dois developers, de uma pipeline automatizada de diagnóstico de hardware e inventário de ponta a ponta.",
        "Co-desenvolvimento de uma aplicação web interna Full Stack em Next.js para processar, validar e converter ficheiros JSON de diagnóstico para formatos CSV/Ramp.",
        "Implementação de rotas de API RESTful em Next.js para integrar e sincronizar os dados processados com a base de dados central na cloud.",
        "Criação de um script em Python (diag.py) integrado num ambiente bootable Debian Live USB para extração autónoma de dados de hardware via CLI (dmidecode, lsblk, lscpu).",
        "Colaboração num ambiente de trabalho 100% em inglês, garantindo o alinhamento com os requisitos da equipa técnica local.",
      ],
      en: [
        "Built, alongside two other developers, an end-to-end automated hardware diagnostics and inventory pipeline.",
        "Co-developed an internal Full Stack Next.js web app to process, validate and convert diagnostic JSON files into CSV/Ramp formats.",
        "Implemented RESTful API routes in Next.js to integrate and sync the processed data with the central cloud database.",
        "Wrote a Python script (diag.py) embedded in a bootable Debian Live USB environment for autonomous hardware data extraction via CLI (dmidecode, lsblk, lscpu).",
        "Collaborated in a fully English-speaking environment, keeping the project aligned with the local technical team's requirements.",
      ],
    },
    tags: ["Next.js", "Python", "Linux", "REST APIs"],
  },
  {
    id: "multimac",
    organisation: "Multimac Hitto Innovation",
    monogram: "MH",
    location: { pt: "Lisboa, Portugal", en: "Lisbon, Portugal" },
    period: { pt: "Jan 2025 — Mar 2025", en: "Jan 2025 — Mar 2025" },
    role: { pt: "Estagiário de Desenvolvimento Web", en: "Web Development Intern" },
    summary: {
      pt: "Primeiro contacto com uma equipa de software profissional.",
      en: "First experience inside a professional software team.",
    },
    points: {
      pt: [
        "Desenvolvimento de soluções web dinâmicas com PHP, JavaScript e HTML.",
        "Manutenção, refatoração e otimização de sistemas internos da empresa.",
        "Integração bem-sucedida numa equipa de desenvolvimento de software profissional.",
      ],
      en: [
        "Built dynamic web solutions with PHP, JavaScript and HTML.",
        "Maintained, refactored and optimised the company's internal systems.",
        "Integrated successfully into a professional software development team.",
      ],
    },
    tags: ["PHP", "JavaScript", "HTML"],
  },
];

export const education: TimelineEntry[] = [
  {
    id: "tgpsi",
    organisation: "Técnico de Gestão e Programação de Sistemas Informáticos",
    monogram: "TG",
    location: { pt: "Lisboa, Portugal", en: "Lisbon, Portugal" },
    period: { pt: "Conclusão em 2026", en: "Completed 2026" },
    role: { pt: "Nível 4 do QEQ · Nota final 19/20", en: "EQF Level 4 · Final grade 19/20" },
    summary: {
      pt: "Curso técnico focado em desenvolvimento web, backend e bases de dados.",
      en: "Technical course focused on web development, backend and databases.",
    },
    points: {
      pt: [
        "Projeto final (PAP): desenvolvimento integral da MacroMath, uma aplicação móvel de gestão nutricional com IA e tracking de macros, em Flutter, Dart e PostgreSQL.",
        "Desenvolvimento web: React, Next.js, HTML, CSS e JavaScript.",
        "Lógica de backend: C#, .NET MVC e Go.",
        "Administração de bases de dados: SQL e PostgreSQL.",
      ],
      en: [
        "Final project (PAP): built MacroMath end to end — an AI-powered nutrition and macro tracking mobile app in Flutter, Dart and PostgreSQL.",
        "Web development: React, Next.js, HTML, CSS and JavaScript.",
        "Backend logic: C#, .NET MVC and Go.",
        "Database administration: SQL and PostgreSQL.",
      ],
    },
    tags: ["Flutter", "C#", ".NET MVC", "PostgreSQL"],
  },
];

export const certifications = [
  {
    id: "az-900",
    name: "Microsoft Certified: Azure Fundamentals (AZ‑900)",
    issuer: "Microsoft",
    issued: { pt: "Novembro de 2025", en: "November 2025" } satisfies Localized,
    /** The Credly badge, saved locally from the credential below. */
    badge: "/certifications/az-900.png",
    href: "https://www.credly.com/badges/7faff002-5e7e-46a6-8cb5-5d93c93307c5/public_url",
  },
];

export const extracurricular = [
  {
    id: "futsal",
    name: {
      pt: "Campeão Distrital de Futsal — 2.ª Divisão",
      en: "District Futsal Champion — 2nd Division",
    } satisfies Localized,
    detail: {
      pt: "Queijas e Benfica / A.F. Lisboa · 2023/2024",
      en: "Queijas e Benfica / A.F. Lisboa · 2023/2024",
    } satisfies Localized,
    video: "https://www.youtube.com/watch?v=f0gQsIwtP2g",
  },
];
