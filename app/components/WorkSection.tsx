"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Project } from "@/app/types/portfolio";

type WorkSectionProps = {
  projects: Project[];
};

/** Projects — Aziz-style scroll dome + Client / Personal groups. */
export function WorkSection({ projects }: WorkSectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 10%"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 22 });
  // Flat → deep dome (more Aziz-like height)
  const curve = useTransform(smooth, [0, 1], [40, 0]);
  const path = useMotionTemplate`M0 40 Q50 ${curve} 100 40 L100 40 L0 40 Z`;

  const client = projects.filter((p) => p.kind === "Client");
  const personal = projects.filter((p) => p.kind !== "Client");

  return (
    <section ref={ref} id="work" className="relative scroll-mt-28">
      <div className="relative bg-[var(--band)] px-6 py-20 text-[var(--band-text)] sm:px-8 sm:py-28">
        {/* Aziz-style dome — taller, smoother */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-full -mb-px h-[min(28vw,220px)] w-full"
        >
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <motion.path d={path} className="fill-[var(--band)]" />
          </svg>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs tracking-[0.25em] text-[var(--band-muted)] uppercase">
              Selected Work
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Projects
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--band-muted)]">
              Real client work and personal builds — both matter.
            </p>
            <p className="mt-8 font-mono text-xs text-[var(--band-muted)]">
              {String(client.length).padStart(2, "0")} client ·{" "}
              {String(personal.length).padStart(2, "0")} personal
            </p>
          </div>

          <div className="space-y-14">
            {client.length > 0 ? (
              <ProjectGroup title="Client / real work" projects={client} />
            ) : null}
            {personal.length > 0 ? (
              <ProjectGroup title="Personal projects" projects={personal} startIndex={client.length} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectGroup({
  title,
  projects,
  startIndex = 0,
}: {
  title: string;
  projects: Project[];
  startIndex?: number;
}) {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-2 text-xs tracking-[0.22em] text-neon uppercase"
      >
        {title}
      </motion.h3>
      <ul className="divide-y divide-[var(--band-border)] border-y border-[var(--band-border)]">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.title}
            project={project}
            index={startIndex + index}
          />
        ))}
      </ul>
    </div>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const n = String(index + 1).padStart(2, "0");
  const primary = project.liveUrl ?? project.githubUrl;

  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative py-8 md:py-10"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 right-0 font-display text-[clamp(4rem,11vw,6.5rem)] font-semibold leading-none text-[var(--band-text)]/[0.04] transition-colors duration-500 group-hover:text-neon/15"
      >
        {n}
      </span>

      <div className="relative flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--band-muted)]">{n}</span>
          {project.kind ? (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase ${
                project.kind === "Personal"
                  ? "bg-neon/15 text-neon"
                  : "border border-[var(--band-border)] text-[var(--band-muted)]"
              }`}
            >
              {project.kind}
            </span>
          ) : null}
        </div>
        {project.status ? (
          <span className="text-[11px] tracking-[0.14em] text-[var(--band-muted)] uppercase">
            {project.status}
          </span>
        ) : null}
      </div>

      <div className="relative mt-3 flex flex-wrap items-end justify-between gap-4">
        {primary ? (
          <a
            href={primary}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-2xl font-semibold tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-3xl"
          >
            {project.title}
          </a>
        ) : (
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {project.title}
          </h3>
        )}
        <span
          aria-hidden
          className="text-neon opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
        >
          ↗
        </span>
      </div>

      <span
        aria-hidden
        className="mt-3 block h-px w-0 bg-neon transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
      />

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--band-muted)] md:text-[15px]">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="text-xs tracking-[0.04em] text-[var(--band-muted)]"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex gap-4 text-xs text-[var(--band-muted)]">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--band-text)]"
          >
            Live
          </a>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--band-text)]"
          >
            Code
          </a>
        ) : null}
      </div>
    </motion.li>
  );
}
