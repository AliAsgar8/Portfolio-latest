"use client";

import { motion } from "framer-motion";
import type { SocialLinks } from "@/app/types/portfolio";

type ContactSectionProps = {
  headline: string;
  socials: SocialLinks;
  name: string;
};

/** Contact — big type, staggered links, soft glow. */
export function ContactSection({
  headline,
  socials,
  name,
}: ContactSectionProps) {
  const links = [
    { label: "Email", href: `mailto:${socials.email}`, value: socials.email },
    { label: "LinkedIn", href: socials.linkedin, value: "Connect" },
    { label: "GitHub", href: socials.github, value: "Code" },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden px-6 py-24 sm:px-8 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-soft)] blur-3xl opacity-50"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start md:items-center md:text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs tracking-[0.25em] text-muted uppercase"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl"
          style={{ lineHeight: 1.15, paddingBottom: "0.06em" }}
        >
          {headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-5 max-w-md text-muted"
        >
          Open to full-time roles, freelance, and interesting product work.
        </motion.p>

        <ul className="mt-12 flex w-full flex-col gap-3 sm:mt-14 md:max-w-xl">
          {links.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.12 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg-elevated/70 px-5 py-4 text-left backdrop-blur-sm transition-colors hover:border-neon"
              >
                <span>
                  <span className="block text-xs tracking-[0.16em] text-muted uppercase">
                    {link.label}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-text md:text-base">
                    {link.value}
                  </span>
                </span>
                <span aria-hidden className="text-neon">
                  ↗
                </span>
              </motion.a>
            </motion.li>
          ))}
        </ul>

      </div>
    </section>
  );
}
