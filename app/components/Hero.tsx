import type { Portfolio } from "@/app/types/portfolio";
import { HeroCards } from "@/app/components/HeroCards";

type HeroProps = {
  data: Portfolio;
};

export function Hero({ data }: HeroProps) {
  const featured = data.projects[0];
  const stackTags = (
    data.skills[0]?.items ?? ["React", "Next.js", "TypeScript", "RN", "Node"]
  ).slice(0, 5);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
        {/* Left */}
        <div>
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            {data.availability}
          </p>

          <h1
            className="font-display text-5xl font-bold tracking-tight text-text sm:text-6xl md:text-7xl"
            style={{ lineHeight: 1.25, paddingBottom: "0.05em" }}
          >
            {data.name}
          </h1>

          <p className="mt-5 max-w-xl text-xl text-muted md:text-2xl">
            {data.headline}
          </p>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted md:text-base">
            {data.summary}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
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
          </div>

          <p className="mt-12 text-xs tracking-[0.18em] text-muted uppercase">
            {data.stackLine}
          </p>
        </div>

        {/* Right — tilt cards */}
        {featured ? (
          <HeroCards
            stackTags={stackTags}
            project={{
              title: featured.title,
              description: featured.description,
              tech: featured.tech,
            }}
          />
        ) : null}
      </div>
    </section>
  );
}
