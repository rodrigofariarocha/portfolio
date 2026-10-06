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
    items: ["Go (Golang)", "ASP.NET MVC", "C#", "C", "Python", "PHP", "REST APIs", "Node.js"],
  },
  {
    key: "data",
    items: ["PostgreSQL", "Supabase", "SQL Server", "Entity Framework Core", "SQL"],
  },
  {
    key: "tools",
    items: ["Git", "GitHub", "Linux", "Bash", "Debian", "VS Code", "Microsoft Azure", "Vercel"],
  },
];
