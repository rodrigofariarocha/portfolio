import type { Locale } from "@/lib/i18n/config";

type Localized = Record<Locale, string>;

/**
 * A screenshot. Files live in `public/projects/<slug>/`.
 *
 * No width or height fields on purpose — `kind` declares the frame's aspect, so
 * dropping in a new image is a one-line change. Kind is per shot rather than
 * per project, because a product can be both an app and a website.
 *
 * Keep captions to a couple of words: they are printed as labels under each
 * thumbnail, not as prose.
 */
export type Shot = { src: string; kind: "phone" | "web"; caption: Localized };

export type Project = {
  slug: string;
  name: string;
  year: string;
  featured: boolean;
  /** What kind of project it was — course project, internship, solo build. */
  context: Localized;
  tagline: Localized;
  description: Localized;
  role: Localized;
  highlights: Record<Locale, string[]>;
  stack: string[];
  /** The card's main image in the work grid, in place of the screenshots. */
  cover?: string;
  /** A live URL to embed, scrollable, on the project's page. Must allow framing. */
  embed?: string;
  repo?: string;
  live?: string;
  /** Anything else worth linking: a demo video, a report, a case study. */
  links?: { label: Localized; href: string }[];
  shots?: Shot[];
};

export const projects: Project[] = [
  {
    slug: "macromath",
    name: "MacroMath",
    year: "2025 — 2026",
    featured: true,
    context: {
      pt: "Começou como Prova de Aptidão Profissional (19/20) · hoje é um produto publicado",
      en: "Started as my final course project (graded 19/20) · now a shipped product",
    },
    tagline: {
      pt: "App de nutrição com IA — publicada na App Store e Google Play",
      en: "AI nutrition app — shipped on the App Store and Google Play",
    },
    description: {
      pt: "Nasceu como projeto final de curso e cresceu para um produto completo: uma app Flutter para iOS e Android, um site de marketing em Astro, documentação própria e uma biblioteca de componentes partilhada entre a app e a web. Faz tracking de macros em tempo real, gere a despensa e usa o MacroAI — um assistente construído sobre o Gemini — para gerar planos alimentares e responder a perguntas de nutrição. Tem plano gratuito e subscrição Premium com pagamentos via Stripe.",
      en: "It began as my final course project and grew into a full product: a Flutter app for iOS and Android, an Astro marketing site, its own documentation, and a component library shared between the app and the web. It tracks macros in real time, manages a kitchen pantry, and uses MacroAI — an assistant built on Gemini — to generate meal plans and answer nutrition questions. Free tier plus a Premium subscription billed through Stripe.",
    },
    role: {
      pt: "Projeto individual — produto, app, backend, web e design system",
      en: "Solo project — product, app, backend, web and design system",
    },
    highlights: {
      pt: [
        "App multiplataforma em Flutter e Dart, com Hive para armazenamento local e cinco separadores: Início, Dieta, Despensa, IA e Perfil",
        "MacroAI, assistente de nutrição sobre o Gemini 2.5 Flash, que gera dietas e responde a perguntas a partir da despensa do utilizador",
        "Backend em Supabase com PostgreSQL e Row Level Security — 5 tabelas, 13 migrações",
        "Três fontes de dados alimentares combinadas: base portuguesa local, FatSecret e Open Food Facts",
        "Design system próprio com 20 componentes documentados, partilhado entre a app em Flutter e o site em Astro",
        "Subscrições Premium com Stripe, site em Astro e documentação em Next.js — em 5 idiomas",
      ],
      en: [
        "Cross-platform Flutter and Dart app with Hive for local storage and five tabs: Home, Diet, Pantry, AI and Profile",
        "MacroAI, a nutrition assistant built on Gemini 2.5 Flash that generates diets and answers questions against the user's pantry",
        "Supabase backend on PostgreSQL with Row Level Security — 5 tables, 13 migrations",
        "Three food data sources combined: a local Portuguese database, FatSecret and Open Food Facts",
        "A design system of 20 documented components, shared between the Flutter app and the Astro site",
        "Premium subscriptions through Stripe, an Astro marketing site and Next.js documentation — in 5 languages",
      ],
    },
    stack: [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "Google Gemini",
      "Astro",
      "Next.js",
      "Stripe",
      "Hive",
    ],
    // cover: "/projects/macromath/cover.png",
    embed: "https://macromath.app/",
    repo: "https://github.com/rodrigofariarocha/macromath_app",
    live: "https://macromath.app",
    links: [
      {
        label: { pt: "Documentação", en: "Documentation" },
        href: "https://docs.macromath.app/en",
      },
      {
        label: { pt: "Design system", en: "Design system" },
        href: "https://ui.macromath.app/en",
      },
    ],
    shots: [
      {
        src: "/projects/macromath/app/inicio.jpg",
        kind: "phone",
        caption: { pt: "Início", en: "Home" },
      },
      {
        src: "/projects/macromath/app/dieta.jpg",
        kind: "phone",
        caption: { pt: "Dieta", en: "Diet" },
      },
      {
        src: "/projects/macromath/app/despensa.jpg",
        kind: "phone",
        caption: { pt: "Despensa", en: "Pantry" },
      },
      {
        src: "/projects/macromath/app/ia.jpg",
        kind: "phone",
        caption: { pt: "MacroAI", en: "MacroAI" },
      },
      {
        src: "/projects/macromath/app/progresso.jpg",
        kind: "phone",
        caption: { pt: "Progresso", en: "Progress" },
      },
      {
        src: "/projects/macromath/app/perfil.jpg",
        kind: "phone",
        caption: { pt: "Perfil", en: "Profile" },
      },
      {
        src: "/projects/macromath/site.png",
        kind: "web",
        caption: { pt: "Site do produto", en: "Product site" },
      },
      {
        src: "/projects/macromath/docs.png",
        kind: "web",
        caption: { pt: "Documentação", en: "Documentation" },
      },
      {
        src: "/projects/macromath/ui.png",
        kind: "web",
        caption: { pt: "Design system", en: "Design system" },
      },
    ],
  },
  {
    slug: "rochacinema",
    name: "RochaCinema",
    year: "2026",
    featured: true,
    context: {
      pt: "Projeto final de Redes de Computadores",
      en: "Final project for the computer networks course",
    },
    tagline: {
      pt: "Plataforma completa de gestão de cinema e reserva de bilhetes",
      en: "Full cinema management and ticket booking platform",
    },
    description: {
      pt: "Uma plataforma web de ponta a ponta para gerir um cinema: catálogo de filmes enriquecido pela API do TMDB, seleção de lugares em tempo real, bilhetes em PDF com QR code, programa de fidelização com pontos e cupões, e recomendações de filmes geradas por IA através do Google Gemini.",
      en: "An end-to-end web platform for running a cinema: a movie catalogue enriched by the TMDB API, real-time seat selection, PDF tickets with embedded QR codes, a loyalty programme with points and coupons, and AI-generated film recommendations via Google Gemini.",
    },
    role: {
      pt: "Projeto individual — arquitetura, backend e frontend",
      en: "Solo project — architecture, backend and frontend",
    },
    highlights: {
      pt: [
        "Reserva de bilhetes com seleção de lugares em tempo real e prevenção de duplos",
        "Geração de bilhetes em PDF com QR code embutido (QuestPDF + QRCoder)",
        "Integração com TMDB para metadados de filmes e com Google Gemini para recomendações",
        "Programa de fidelização com acumulação de pontos e emissão de cupões",
        "Autenticação com ASP.NET Identity, dashboard de administração e notificações por email",
      ],
      en: [
        "Ticket booking with real-time seat selection and double-booking prevention",
        "PDF ticket generation with embedded QR codes (QuestPDF + QRCoder)",
        "TMDB integration for movie metadata and Google Gemini for recommendations",
        "Loyalty programme with point accrual and coupon issuing",
        "ASP.NET Identity auth, admin dashboard and transactional email notifications",
      ],
    },
    stack: [
      "ASP.NET Core 9",
      "C#",
      "Entity Framework Core 9",
      "SQL Server",
      "Razor",
      "Bootstrap",
      "TMDB API",
      "Google Gemini",
    ],
    live: "https://cinemarocha.onrender.com/",
    // Render's free tier sleeps after inactivity, so a cold frame can sit blank
    // for the best part of a minute before the first paint.
    embed: "https://cinemarocha.onrender.com/",
    repo: "https://github.com/rodrigofariarocha/cinema-management-system-project",
  },
  {
    slug: "hardware-diagnostics",
    name: "Hardware Diagnostics Pipeline",
    year: "2026",
    featured: true,
    context: {
      pt: "Estágio internacional Erasmus+ — Atenas, Grécia",
      en: "Erasmus+ international internship — Athens, Greece",
    },
    tagline: {
      pt: "Diagnóstico de hardware e conversão de inventário para NGSI-LD",
      en: "Hardware diagnostics and inventory conversion to NGSI-LD",
    },
    description: {
      pt: "Desenvolvido em Atenas, na Epanekkinisis, durante um estágio internacional Erasmus+, para a plataforma CIRCULOOS. Uma pipeline de ponta a ponta: um Debian Live USB arranca e extrai autonomamente as especificações de uma máquina via CLI, e uma aplicação web converte as folhas de inventário resultantes em entidades NGSI-LD, enviando-as diretamente para um broker Orion-LD. Todo o processamento acontece no browser — nada sai dali além do POST explícito para o endpoint configurado.",
      en: "Built in Athens at Epanekkinisis during an Erasmus+ international internship, for the CIRCULOOS platform. An end-to-end pipeline: a Debian Live USB boots and autonomously pulls a machine's specifications via CLI, and a web app converts the resulting inventory sheets into NGSI-LD entities, posting them straight to an Orion-LD broker. All processing happens in the browser — nothing leaves it beyond the explicit POST to the configured endpoint.",
    },
    role: {
      pt: "Equipa de três developers — script de extração e app web",
      en: "Team of three developers — extraction script and web app",
    },
    highlights: {
      pt: [
        "Script Python (diag.py) num ambiente bootable Debian Live USB, extraindo dados via dmidecode, lsblk e lscpu",
        "Aplicação web em Astro e React que lê folhas .xlsx e .csv com SheetJS e PapaParse",
        "Conversão para entidades NGSI-LD, com as colunas a virarem atributos Property em camelCase",
        "Envio direto para um broker Orion-LD em application/ld+json, com verificação prévia de conectividade",
        "Processamento inteiramente no cliente — os dados de inventário nunca passam por um servidor intermédio",
        "Trabalho em equipa num ambiente 100% em inglês, alinhado com os requisitos da equipa técnica local",
      ],
      en: [
        "Python script (diag.py) inside a bootable Debian Live USB, pulling data via dmidecode, lsblk and lscpu",
        "Astro and React web app reading .xlsx and .csv sheets with SheetJS and PapaParse",
        "Conversion into NGSI-LD entities, with sheet columns becoming camelCase Property attributes",
        "Direct POST to an Orion-LD broker as application/ld+json, with a connectivity check first",
        "Entirely client-side processing — inventory data never passes through an intermediate server",
        "Teamwork in a fully English-speaking environment, aligned with the local technical team's requirements",
      ],
    },
    stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "Python", "Debian", "Linux"],
    live: "https://csv-convert-virid.vercel.app/",
    embed: "https://csv-convert-virid.vercel.app/",
    // The team's repository, not mine — the role above says as much.
    repo: "https://github.com/JC-dev9/csv-convert",
  },
  {
    slug: "sf-cosmetics",
    name: "SF Cosmetics",
    year: "2026",
    featured: false,
    context: {
      pt: "Loja online construída para a minha mãe",
      en: "Online shop built for my mother",
    },
    tagline: {
      pt: "E-commerce de cosmética e perfumaria, com painel de administração e IA",
      en: "Cosmetics and perfumery e-commerce, with an AI-assisted admin panel",
    },
    description: {
      pt: "Uma loja online de cosmética, perfumaria e acessórios de beleza, feita para o negócio da minha mãe. Do lado do cliente tem catálogo por categorias, páginas de produto com pirâmide olfativa e stock em tempo real, carrinho persistente e favoritos. Do lado dela tem um painel de administração completo — encomendas, clientes, despesas, CMS — onde descrever um produto por palavras basta para a IA gerar a ficha inteira.",
      en: "An online shop for cosmetics, perfumery and beauty accessories, built for my mother's business. On the customer side: a category catalogue, product pages with fragrance pyramids and live stock, a persistent cart and favourites. On hers: a full admin panel — orders, customers, expenses, CMS — where describing a product in plain words is enough for the AI to fill in the whole record.",
    },
    role: {
      pt: "Projeto individual — loja, painel de administração e base de dados",
      en: "Solo project — storefront, admin panel and database",
    },
    highlights: {
      pt: [
        "Catálogo com 7 categorias e páginas de produto detalhadas — notas de topo, coração e base, família olfativa e stock em tempo real",
        "Criação de produtos por IA com o Gemini 2.0 Flash: descreve-se o produto em linguagem natural e a ficha é preenchida sozinha",
        "Extração de catálogos a partir de PDF, CSV ou texto, também por IA",
        "Carrinho persistente — localStorage para visitantes, Supabase para quem tem conta",
        "Painel de administração com métricas em tempo real, gestão de encomendas, clientes e despesas, e um CMS para a navegação e a homepage",
        "Supabase com PostgreSQL e Row-Level Security, autenticação por email e Google OAuth",
      ],
      en: [
        "A 7-category catalogue with detailed product pages — top, heart and base notes, fragrance family and live stock",
        "AI product creation with Gemini 2.0 Flash: describe the product in plain language and the record fills itself in",
        "Catalogue extraction from PDF, CSV or plain text, also AI-assisted",
        "Persistent cart — localStorage for visitors, Supabase once they have an account",
        "Admin panel with live metrics, order, customer and expense management, and a CMS for navigation and the homepage",
        "Supabase on PostgreSQL with Row-Level Security, email and Google OAuth authentication",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Google Gemini",
    ],
  },
];
