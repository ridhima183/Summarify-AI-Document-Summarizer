"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-11 w-11 rounded-full border border-border" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/10"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}