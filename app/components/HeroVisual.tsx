"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type HeroVisualProps = {
  tags: string[];
};

const LINES = [
  { prefix: "const", code: " role", accent: " = ", value: '"Frontend Dev"' },
  { prefix: "const", code: " stack", accent: " = ", value: "[" },
  { prefix: "  ", code: "", accent: "", value: '"React", "Next.js",' },
  { prefix: "  ", code: "", accent: "", value: '"TypeScript", "Node"' },
  { prefix: "", code: "", accent: "", value: "]" },
  { prefix: "export", code: " default", accent: " ", value: "build()" },
] as const;

/** Code-window visual — tilts with the cursor, types stack lines in. */
export function HeroVisual({ tags }: HeroVisualProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(
    reduceMotion ? LINES.length : 0,
  );
  const [showCursor, setShowCursor] = useState(true);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.4 };
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);
  const glareX = useTransform(x, [-0.5, 0.5], [12, 88]);
  const glareY = useTransform(y, [-0.5, 0.5], [18, 82]);
  const glare = useMotionTemplate`radial-gradient(560px circle at ${glareX}% ${glareY}%, var(--neon-soft), transparent 55%)`;

  useEffect(() => {
    if (reduceMotion) {
      setVisibleLines(LINES.length);
      return;
    }

    setVisibleLines(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisibleLines(i);
      if (i >= LINES.length) window.clearInterval(id);
    }, 380);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setShowCursor((v) => !v), 530);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const chips = tags.slice(0, 4);

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto w-full max-w-[26rem] perspective-[1200px]"
      onMouseMove={reduceMotion ? undefined : onMove}
      onMouseLeave={reduceMotion ? undefined : onLeave}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-full bg-[var(--neon-soft)] opacity-50 blur-3xl"
        aria-hidden
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.35rem] border border-border bg-bg-elevated/90 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.55)] backdrop-blur-md"
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                backgroundImage: glare,
              }
        }
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] tracking-wide text-muted">
            ali-asgar.tsx
          </span>
          <span className="ml-auto rounded-full bg-neon/15 px-2 py-0.5 font-mono text-[10px] text-neon">
            live
          </span>
        </div>

        {/* Code body */}
        <div className="space-y-1.5 px-4 py-5 font-mono text-[13px] leading-relaxed sm:text-[14px]">
          {LINES.slice(0, visibleLines).map((line, index) => (
            <motion.p
              key={`${line.value}-${index}`}
              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="whitespace-pre"
            >
              <span className="text-muted/70">{line.prefix}</span>
              <span className="text-text">{line.code}</span>
              <span className="text-muted">{line.accent}</span>
              <span className="text-neon">{line.value}</span>
              {index === visibleLines - 1 && visibleLines < LINES.length ? (
                <span
                  className={`ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-neon align-middle ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden
                />
              ) : null}
            </motion.p>
          ))}

          {visibleLines >= LINES.length ? (
            <p className="whitespace-pre">
              <span
                className={`inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-neon align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden
              />
            </p>
          ) : null}
        </div>

        {/* Footer chips */}
        <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
          {chips.map((tag, index) => (
            <motion.span
              key={tag}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduceMotion ? 0 : 0.35 + index * 0.08,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-full border border-border bg-bg/70 px-2.5 py-1 text-[11px] text-muted"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Floating accent label */}
      <motion.div
        className="absolute -top-3 -right-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-[11px] font-medium text-muted shadow-lg sm:-right-4"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -6, 0] }
        }
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Shipping UIs
      </motion.div>

      <motion.div
        className="absolute -bottom-3 -left-2 rounded-full border border-neon/30 bg-neon/10 px-3 py-1.5 text-[11px] font-medium text-neon shadow-lg sm:-left-3"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 5, 0] }
        }
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        Open to roles
      </motion.div>
    </motion.div>
  );
}
