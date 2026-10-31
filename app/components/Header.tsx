"use client";

import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import type { NavItem } from "@/app/types/portfolio";
import { Logo } from "@/app/components/Logo";
import { ThemeToggle } from "@/app/components/ThemeToggle";

const COMPACT_AFTER = 40; // px — switch to floating pill after this

type HeaderProps = {
  name: string;
  nav: NavItem[];
  contactHref?: string;
};

export function Header({ name, nav, contactHref = "#contact" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // 1) Scroll → compact header
  useEffect(() => {
    const sync = (y: number) => setScrolled(y > COMPACT_AFTER);

    sync(scrollY.get()); // page may already be scrolled on load
    return scrollY.on("change", sync); // then keep updating while scrolling
  }, [scrollY]);

  // 2) Mobile menu open → lock page scroll + Esc to close
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={`pointer-events-auto mx-auto w-full transition-all duration-500 sm:px-8 ease-out mt-3 ${
            scrolled ? " max-w-5xl px-3" : " max-w-6xl px-6"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-3 overflow-visible border px-3 py-3 transition-all duration-500 ease-out ${
              scrolled
                ? "rounded-[1.65rem] border-border/80 bg-bg-elevated/80 shadow-2xl backdrop-blur-xl dark:bg-[#12141a]"
                : "rounded-none border-transparent bg-transparent shadow-none backdrop-blur-none"
            }`}
          >
            <a
              href="/"
              className="group flex min-w-0 items-center gap-2.5 overflow-visible rounded-xl outline-offset-4"
              onClick={closeMenu}
            >
              <span className="inline-flex shrink-0">
                <Logo size={38} />
              </span>
              <span className="font-display text-lg font-semibold text-text">
                {name}
              </span>
            </a>

            <nav
              className={`hidden items-center border backdrop-blur-md transition-all duration-500 ease-out md:flex ${
                scrolled
                  ? "gap-0.5 rounded-2xl border-transparent bg-transparent px-0 py-0"
                  : "gap-1 rounded-2xl border-border/70 bg-bg-elevated/55 px-1.5 py-1.5 dark:bg-bg-elevated/40"
              }`}
              aria-label="Primary"
            >
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3.5 py-2 text-[0.8rem] font-medium tracking-[0.04em] text-muted transition-colors hover:bg-text/5 hover:text-text"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href={contactHref}
                className={`hidden items-center gap-1.5 rounded-2xl text-[0.85rem] font-medium transition-all duration-500 ease-out sm:inline-flex ${
                  scrolled
                    ? "bg-text px-3.5 py-2 text-bg hover:opacity-90"
                    : "bg-transparent px-3.5 py-2 text-text hover:text-neon"
                }`}
              >
                Say hello
                <span aria-hidden className="text-sm leading-none">
                  ↗
                </span>
              </a>

              <ThemeToggle />

              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text transition-colors hover:bg-text/5 md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <MenuIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          className={`absolute inset-0 bg-bg/70 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />
        <div
          className={`absolute inset-x-4 top-[4.75rem] origin-top rounded-3xl border border-border bg-bg-elevated p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] transition-all duration-300 ${
            menuOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-2 scale-[0.98] opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-base font-medium text-text transition-colors hover:bg-text/5"
              >
                {item.label}
              </a>
            ))}
            <a
              href={contactHref}
              onClick={closeMenu}
              className="mt-1 inline-flex items-center justify-between rounded-2xl bg-text px-4 py-3 text-base font-medium text-bg"
            >
              Say hello
              <span aria-hidden>↗</span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h10" />
      )}
    </svg>
  );
}
