"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type HeroCardsProps = {
  stackTags: string[];
  project: {
    title: string;
    description: string;
    tech: string[];
  };
};

/** Floating cards — move with the cursor (tilt + parallax). */
export function HeroCards({ stackTags, project }: HeroCardsProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 130, damping: 18, mass: 0.35 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);

  // Front card (Now building)
  const card1X = useTransform(x, [-0.5, 0.5], [-18, 18]);
  const card1Y = useTransform(y, [-0.5, 0.5], [-14, 14]);
  const card1RX = useTransform(y, [-0.5, 0.5], [9, -9]);
  const card1RY = useTransform(x, [-0.5, 0.5], [-11, 11]);

  // Back card (Stack) — moves the other way
  const card2X = useTransform(x, [-0.5, 0.5], [22, -22]);
  const card2Y = useTransform(y, [-0.5, 0.5], [16, -16]);
  const card2RX = useTransform(y, [-0.5, 0.5], [-7, 7]);
  const card2RY = useTransform(x, [-0.5, 0.5], [9, -9]);

  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, var(--neon-soft), transparent 55%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto flex h-[380px] w-full max-w-md items-center justify-center perspective-[1100px] md:h-[460px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-[var(--neon-soft)] blur-3xl" />

      {/* Stack card — back right */}
      <motion.div
        className="absolute top-10 right-2 z-10 w-[200px] rounded-2xl border border-border bg-bg-elevated p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)] md:top-14 md:right-4 md:w-[220px]"
        style={{
          x: card2X,
          y: card2Y,
          rotateX: card2RX,
          rotateY: card2RY,
          transformStyle: "preserve-3d",
        }}
      >
        <p className="text-[10px] tracking-[0.18em] text-muted uppercase">
          Stack
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {stackTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-bg px-2.5 py-1 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Now building — front */}
      <motion.div
        className="relative z-20 w-[min(100%,280px)] rounded-3xl border border-border bg-bg-elevated p-5 shadow-[0_28px_70px_rgba(0,0,0,0.22)] md:mt-16 md:mr-16"
        style={{
          x: card1X,
          y: card1Y,
          rotateX: card1RX,
          rotateY: card1RY,
          transformStyle: "preserve-3d",
          backgroundImage: glare,
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_10px_var(--neon-soft)]" />
          <span className="text-[11px] text-muted">Now building</span>
        </div>
        <p className="font-display text-xl font-semibold leading-snug md:text-2xl">
          {project.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
