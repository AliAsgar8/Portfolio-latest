"use client";

import { motion } from "framer-motion";
import type { Portfolio } from "@/app/types/portfolio";

type AboutSectionProps = {
  about: Portfolio["about"];
  skills: Portfolio["skills"];
};

/** About — story + Zishan-style stack toolkit + moving skill strip. */
export function AboutSection({ about, skills }: AboutSectionProps) {
  const allSkills = skills.flatMap((g) => g.items);

  return (
    <section
      id="about"
      className="scroll-mt-28 overflow-hidden bg-bg-elevated/50 px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-xs tracking-[0.25em] text-muted uppercase"
          >
            About
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl"
          >
            {about.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-muted md:text-lg"
          >
            {about.intro}
          </motion.p>

          <div className="mt-10 space-y-8">
            {[
              { title: "Background", body: about.background },
              { title: "What I build", body: about.whatIBuild },
              { title: "Current focus", body: about.currentFocus },
            ].map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <h3 className="text-sm font-medium tracking-[0.08em] text-neon uppercase">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-[15px]">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Toolkit — category columns like Zishan */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border bg-bg p-6 md:p-8"
        >
          <p className="text-xs tracking-[0.22em] text-muted uppercase">
            Stack
          </p>
          <h3 className="font-display mt-2 text-2xl font-semibold">
            The toolkit
          </h3>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {skills.map((group, gi) => (
              <div key={group.title}>
                <h4 className="text-xs tracking-[0.18em] text-neon uppercase">
                  {group.title}
                </h4>
                <ul className="mt-3 space-y-2">
                  {group.items.map((item, ii) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: gi * 0.06 + ii * 0.04,
                      }}
                      className="text-sm text-text"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Moving skill strip — interactive feel like Zishan’s toolkit chips */}
      <div className="relative mx-auto mt-16 w-full max-w-6xl">
        <p className="mb-4 text-center text-xs tracking-[0.2em] text-muted uppercase">
          Hover a chip · strip keeps moving
        </p>
        <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="skill-marquee flex w-max gap-3">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="shrink-0 rounded-full border border-border bg-bg px-4 py-2 text-sm text-muted transition-colors hover:border-neon hover:text-neon hover:shadow-[0_0_20px_var(--glow)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
