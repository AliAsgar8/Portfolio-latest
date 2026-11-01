"use client";

import { motion } from "framer-motion";
import type { Experience } from "@/app/types/portfolio";

type ExperienceSectionProps = {
  items: Experience[];
};

/** Timeline — line draws in, roles stagger up. */
export function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="scroll-mt-28 px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.25em] text-muted uppercase">
            Experience
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Where I&apos;ve shipped
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted md:text-base">
            Real product work as a frontend developer — ~1.5 years building UIs
            that users actually use.
          </p>
        </motion.div>

        <div className="relative mt-14">
          {/* Vertical timeline line */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-border md:left-[11px]"
          />

          <ul className="space-y-12">
            {items.map((job, index) => (
              <motion.li
                key={`${job.company}-${job.period}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid gap-4 pl-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] md:gap-10 md:pl-14"
              >
                <span
                  aria-hidden
                  className="absolute top-1.5 left-0 h-4 w-4 rounded-full border-2 border-neon bg-bg md:top-2 md:h-6 md:w-6"
                />

                <div>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                  <p className="mt-1 text-sm text-muted">{job.location}</p>
                  <h3 className="font-display mt-3 text-xl font-semibold md:text-2xl">
                    {job.company}
                  </h3>
                  <p className="mt-1 text-sm text-neon">{job.role}</p>
                </div>

                <div>
                  <ul className="space-y-2.5">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm leading-relaxed text-muted md:text-[15px]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs tracking-[0.06em] text-muted">
                    {job.tech.join(" · ")}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
