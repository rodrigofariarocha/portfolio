"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ label }: { label: string }) {
  const { setTheme } = useTheme();

  // Read the current theme off the DOM at click time rather than mirroring it
  // in state: next-themes stamps the class before first paint, so the icons can
  // be driven entirely by CSS and there is no wrong-icon flash to guard against.
  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className="pressable relative grid size-8 place-items-center rounded-full text-text-muted transition-colors duration-200 hover:text-text"
    >
      <Sun
        aria-hidden
        className="absolute size-[18px] scale-75 opacity-0 transition-[opacity,transform] duration-300 ease-(--ease-out) dark:scale-100 dark:opacity-100"
      />
      <Moon
        aria-hidden
        className="absolute size-[18px] scale-100 opacity-100 transition-[opacity,transform] duration-300 ease-(--ease-out) dark:scale-75 dark:opacity-0"
      />
    </button>
  );
}
