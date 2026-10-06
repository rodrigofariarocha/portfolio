import type { Locale } from "./config";

const pt = {
  meta: {
    title: "Rodrigo Rocha — Full Stack Developer",
    description:
      "Junior Full Stack Developer em Lisboa. React, Next.js, Astro, Go e .NET. Experiência em migração de plataformas web, automação de sistemas Linux e integração de APIs.",
  },
  pages: {
    work: {
      title: "Projetos",
      description:
        "Projetos de Rodrigo Rocha — plataformas web, aplicações móveis e automação de sistemas.",
    },
    journey: {
      title: "Percurso",
      description:
        "Experiência profissional, educação e certificações de Rodrigo Rocha.",
    },
    stack: {
      title: "Stack",
      description: "Tecnologias com que Rodrigo Rocha trabalha, camada a camada.",
    },
    contact: {
      title: "Contacto",
      description: "Fala com Rodrigo Rocha — Full Stack Developer em Lisboa.",
    },
  },
  nav: {
    skipToContent: "Saltar para o conteúdo",
    tabs: {
      home: "Início",
      work: "Projetos",
      journey: "Percurso",
      stack: "Stack",
      contact: "Contacto",
    },
    toggleTheme: "Mudar tema",
    toggleLanguage: "Mudar idioma",
    back: "Voltar",
  },
  hero: {
    role: "Full Stack Developer",
    headline: "Construo software web que funciona bem e sente-se melhor.",
    intro:
      "Técnico de Gestão e Programação de Sistemas Informáticos, focado em Full Stack. Trabalho com React, Next.js, Astro e Go — do frontend ao backend, com atenção ao detalhe que normalmente ninguém repara.",
    location: "Queijas, Lisboa",
    primaryCta: "Ver projetos",
    secondaryCta: "Descarregar CV",
  },
  home: {
    workHeading: "Projetos selecionados",
    workSub: "Cinco projetos que resumem bem como trabalho.",
    viewAllWork: "Ver todos os projetos",
    ctaHeading: "Vamos trabalhar juntos?",
    ctaBody:
      "Estou aberto a oportunidades como Full Stack Developer, freelance ou colaborações.",
    ctaAction: "Falar comigo",
  },
  about: {
    eyebrow: "Sobre",
    heading: "Perfil profissional",
    body: [
      "Sou um developer Full Stack de Lisboa, formado como Técnico de Gestão e Programação de Sistemas Informáticos com nota final de 19/20. Passei os últimos anos a construir coisas reais: plataformas em produção, pipelines de diagnóstico de hardware e aplicações móveis com IA.",
      "Tenho experiência prática em desenvolvimento de soluções web modernas, automação de sistemas Linux e integração de APIs — tanto no ecossistema nacional como em ambiente internacional, num estágio Erasmus+ em Atenas onde trabalhei 100% em inglês.",
      "O que me move é a resolução de problemas complexos e o código limpo. Gosto de perceber o porquê de uma interface se sentir bem, não apenas de a fazer funcionar.",
    ],
    facts: {
      grade: "Nota final de curso",
      gradeValue: "19/20",
      qualification: "Qualificação",
      qualificationValue: "Nível 4 QEQ",
      languages: "Línguas",
      languagesValue: "PT nativo · EN C1",
      based: "Base",
      basedValue: "Lisboa, Portugal",
    },
  },
  projects: {
    eyebrow: "Trabalho",
    heading: "Projetos",
    subheading:
      "Do frontend ao backend, de aplicações móveis a automação de sistemas.",
    viewCode: "Ver código",
    viewLive: "Ver online",
    stackLabel: "Stack",
    highlightsLabel: "O que construí",
    aboutHeading: "Sobre o projeto",
    factsHeading: "Ficha",
    contextLabel: "Contexto",
    roleLabel: "Função",
    yearLabel: "Ano",
    linksLabel: "Links",
    appScreens: "A app",
    onTheWeb: "Na web",
    liveSite: "O site, ao vivo",
    videos: "Em vídeo",
    liveTab: "Ao vivo",
    mediaLabel: "Conteúdo do projeto",
    expandSite: "Expandir o site",
    closeSite: "Fechar",
    closeImage: "Fechar imagem",
    previousImage: "Imagem anterior",
    nextImage: "Imagem seguinte",
    privateRepo: "Repositório privado",
    backToWork: "Projetos",
    nextProject: "Projeto seguinte",
    backToSite: "Voltar ao site",
  },
  skills: {
    eyebrow: "Stack",
    heading: "Tecnologias com que trabalho",
    subheading:
      "As ferramentas que uso no dia a dia, agrupadas pela camada onde vivem.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Bases de dados",
      tools: "Ferramentas & SysAdmin",
    },
  },
  experience: {
    eyebrow: "Percurso",
    heading: "Experiência & educação",
    workHeading: "Experiência profissional",
    educationHeading: "Educação",
    certificationsHeading: "Certificações",
    viewCredential: "Ver credencial",
    watchVideo: "Ver vídeo",
    extrasHeading: "Atividades extracurriculares",
  },
  contact: {
    eyebrow: "Contacto",
    heading: "Vamos falar",
    subheading:
      "Estou aberto a oportunidades como Full Stack Developer, freelance ou colaborações. Responde-me por email ou usa o formulário — chega ao mesmo sítio.",
    directHeading: "Direto",
    form: {
      name: "Nome",
      namePlaceholder: "O teu nome",
      email: "Email",
      emailPlaceholder: "email@exemplo.com",
      message: "Mensagem",
      messagePlaceholder: "Conta-me em que estás a pensar…",
      submit: "Enviar mensagem",
      submitting: "A enviar…",
      success: "Mensagem enviada. Respondo em breve — obrigado!",
      errors: {
        name: "Escreve o teu nome.",
        email: "Escreve um email válido.",
        message: "A mensagem tem de ter pelo menos 10 caracteres.",
        generic: "Não consegui enviar a mensagem. Tenta o email direto.",
        unconfigured:
          "O envio por formulário ainda não está configurado. Usa o email direto por agora.",
      },
    },
  },
  footer: {
    built: "Construído com Next.js, TypeScript e Tailwind CSS.",
    rights: "Todos os direitos reservados.",
  },
};

/** The PT dictionary is the source of truth for shape; EN must match it exactly. */
export type Dictionary = typeof pt;

const en: Dictionary = {
  meta: {
    title: "Rodrigo Rocha — Full Stack Developer",
    description:
      "Junior Full Stack Developer based in Lisbon. React, Next.js, Astro, Go and .NET. Experience in web platform migration, Linux system automation and API integration.",
  },
  pages: {
    work: {
      title: "Work",
      description:
        "Rodrigo Rocha's projects — web platforms, mobile apps and systems automation.",
    },
    journey: {
      title: "Journey",
      description: "Rodrigo Rocha's professional experience, education and certifications.",
    },
    stack: {
      title: "Stack",
      description: "The technologies Rodrigo Rocha works with, layer by layer.",
    },
    contact: {
      title: "Contact",
      description: "Get in touch with Rodrigo Rocha — Full Stack Developer in Lisbon.",
    },
  },
  nav: {
    skipToContent: "Skip to content",
    tabs: {
      home: "Home",
      work: "Work",
      journey: "Journey",
      stack: "Stack",
      contact: "Contact",
    },
    toggleTheme: "Toggle theme",
    toggleLanguage: "Toggle language",
    back: "Back",
  },
  hero: {
    role: "Full Stack Developer",
    headline: "I build web software that works well and feels better.",
    intro:
      "IT Systems Management and Programming technician, focused on Full Stack. I work with React, Next.js, Astro and Go — frontend to backend, with attention to the details nobody usually notices.",
    location: "Queijas, Lisbon",
    primaryCta: "View work",
    secondaryCta: "Download CV",
  },
  home: {
    workHeading: "Selected projects",
    workSub: "Five projects that sum up how I work.",
    viewAllWork: "See all projects",
    ctaHeading: "Let's build something?",
    ctaBody:
      "I'm open to Full Stack Developer roles, freelance work and collaborations.",
    ctaAction: "Get in touch",
  },
  about: {
    eyebrow: "About",
    heading: "Professional profile",
    body: [
      "I'm a Full Stack developer from Lisbon, trained as an IT Systems Management and Programming technician with a final grade of 19/20. I've spent the last few years building real things: production platforms, hardware diagnostics pipelines and AI-powered mobile apps.",
      "I have hands-on experience building modern web solutions, automating Linux systems and integrating APIs — both locally and internationally, through an Erasmus+ internship in Athens where I worked entirely in English.",
      "What drives me is solving complex problems and writing clean code. I like understanding why an interface feels right, not just making it work.",
    ],
    facts: {
      grade: "Final course grade",
      gradeValue: "19/20",
      qualification: "Qualification",
      qualificationValue: "EQF Level 4",
      languages: "Languages",
      languagesValue: "PT native · EN C1",
      based: "Based in",
      basedValue: "Lisbon, Portugal",
    },
  },
  projects: {
    eyebrow: "Work",
    heading: "Projects",
    subheading: "Frontend to backend, mobile apps to systems automation.",
    viewCode: "View code",
    viewLive: "View live",
    stackLabel: "Stack",
    highlightsLabel: "What I built",
    aboutHeading: "About the project",
    factsHeading: "At a glance",
    contextLabel: "Context",
    roleLabel: "Role",
    yearLabel: "Year",
    linksLabel: "Links",
    appScreens: "The app",
    onTheWeb: "On the web",
    liveSite: "The live site",
    videos: "On video",
    liveTab: "Live",
    mediaLabel: "Project media",
    expandSite: "Expand the site",
    closeSite: "Close",
    closeImage: "Close image",
    previousImage: "Previous image",
    nextImage: "Next image",
    privateRepo: "Private repository",
    backToWork: "Work",
    nextProject: "Next project",
    backToSite: "Back to the site",
  },
  skills: {
    eyebrow: "Stack",
    heading: "Technologies I work with",
    subheading: "The tools I use day to day, grouped by the layer they live in.",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      data: "Databases",
      tools: "Tools & SysAdmin",
    },
  },
  experience: {
    eyebrow: "Journey",
    heading: "Experience & education",
    workHeading: "Professional experience",
    educationHeading: "Education",
    certificationsHeading: "Certifications",
    viewCredential: "View credential",
    watchVideo: "Watch video",
    extrasHeading: "Extracurricular",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Let's talk",
    subheading:
      "I'm open to Full Stack Developer roles, freelance work and collaborations. Email me or use the form — both land in the same place.",
    directHeading: "Direct",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "email@example.com",
      message: "Message",
      messagePlaceholder: "Tell me what you have in mind…",
      submit: "Send message",
      submitting: "Sending…",
      success: "Message sent. I'll get back to you shortly — thank you!",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email.",
        message: "The message must be at least 10 characters.",
        generic: "I couldn't send the message. Try the direct email instead.",
        unconfigured:
          "Form delivery isn't configured yet. Please use the direct email for now.",
      },
    },
  },
  footer: {
    built: "Built with Next.js, TypeScript and Tailwind CSS.",
    rights: "All rights reserved.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
