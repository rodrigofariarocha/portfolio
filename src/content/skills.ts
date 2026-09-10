export type SkillGroupKey = "frontend" | "backend" | "data" | "tools";

export type SkillGroup = {
  key: SkillGroupKey;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "frontend",
    items: [
      "React",
      "Next.js",
      "Astro",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Flutter",
      "Dart",
    ],
  },
  {
    key: "backend",
    items: ["Go (Golang)", ".NET MVC", "C#", "Python", "PHP", "REST APIs", "Node.js"],
  },
  {
    key: "data",
    items: ["PostgreSQL", "SQL Server", "Entity Framework Core", "SQL"],
  },
  {
    key: "tools",
    items: ["Git", "GitHub", "Linux", "Debian", "VS Code", "Azure", "Vercel"],
  },
];
