"use client";

import { motion } from "framer-motion";
import type { Portfolio } from "@/app/types/portfolio";
import { HeroVisual } from "@/app/components/HeroVisual";
import { MatterBackground } from "./MatterBackground";

type HeroProps = {
  data: Portfolio;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function Hero({ data }: HeroProps) {
  const tags = (
    data.skills[0]?.items ?? ["React", "Next.js", "TypeScript", "Node"]
  ).slice(0, 4);

  return (
    <section className="relative isolate -mt-28 min-h-svh w-full overflow-hidden pt-28">
      <div className="hidden md:block">

      <MatterBackground />
      </div>


      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-start gap-10 px-6 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-2 lg:gap-8">
        <div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            {data.availability}
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-bold tracking-tight text-text sm:text-6xl md:text-7xl"
          >
            {data.name}
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-xl text-muted md:text-2xl"
          >
            {data.headline}
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted md:text-base"
          >
            {data.summary}
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#work"
              className="rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-[#111] shadow-[0_0_28px_var(--glow)] transition hover:shadow-[0_0_40px_var(--glow)]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:border-neon"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-xs tracking-[0.18em] text-muted uppercase"
          >
            {data.stackLine}
          </motion.p>
        </div>

        {/* <div className="relative hidden min-w-0 items-center justify-end lg:flex lg:pt-6">
          <HeroVisual tags={tags} />
        </div> */}
      </div>
    </section>
  );
}
