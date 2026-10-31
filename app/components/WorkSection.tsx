"use client";

import { motion } from "framer-motion";
import type { Project } from "@/app/types/portfolio";

type WorkSectionProps = {
  projects: Project[];
};

/** Projects list — section itself is the width container. */
export function WorkSection({ projects }: WorkSectionProps) {
  return (
    <section
      id="work"
      className="scroll-mt-28 bg-[var(--band)] px-6 py-20 text-[var(--band-text)] sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl">

      <p className="text-xs tracking-[0.25em] text-[var(--band-muted)] uppercase">
        Selected Work
      </p>
      <h2 className="font-display mt-2 text-3xl font-semibold md:text-4xl">
        Projects
      </h2>

      <div className="mt-10 space-y-5">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative overflow-hidden rounded-3xl border border-[var(--band-border)] bg-[var(--band-card)] p-6 md:p-8"
            >
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-[var(--band-muted)]">
                  <span className="font-mono text-[var(--band-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {project.status ? (
                    <span className="rounded-full border border-[var(--band-border)] px-2 py-0.5 text-[11px]">
                      {project.status}
                    </span>
                  ) : null}
                </div>

                <h3 className="font-display text-2xl font-semibold md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--band-muted)]">
                  {project.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <li
                    key={tech}
                    className="rounded-full border border-[var(--band-border)] px-3 py-1 text-xs text-[var(--band-muted)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 self-start">
                {project.liveUrl ? (
                  <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--band-border)] px-4 py-2 text-xs text-[var(--band-muted)] transition group-hover:border-[var(--band-text)] group-hover:text-[var(--band-text)]"
                  >
                    View Live
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--band-border)] px-4 py-2 text-xs text-[var(--band-muted)] transition group-hover:border-[var(--band-text)] group-hover:text-[var(--band-text)]"
                  >
                    Code
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
        </div>
    </section>
  );
}
