"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const onToggle = () => {
    const next = isDark ? "light" : "dark";
    // Dark falls from top; light rises from bottom (Tariq-style wipe)
    const direction = next === "dark" ? "down" : "up";
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!("startViewTransition" in document) || reduceMotion) {
      setTheme(next);
      return;
    }

    root.dataset.themeTransition = direction;

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.finished.finally(() => {
      delete root.dataset.themeTransition;
    });
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-text hover:bg-text/5 ${className}`}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
