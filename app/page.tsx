import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { WorkSection } from "@/app/components/WorkSection";
import { getPortfolio } from "@/app/lib/getPortfolio";

export default function Home() {
  const data = getPortfolio();

  return (
    <>
      <div id="top" />
      <Header name={data.name} nav={data.nav} contactHref="#contact" />

      <main className="flex flex-1 flex-col pt-28">
        <Hero data={data} />
        <WorkSection projects={data.projects} />

        <section
          id="experience"
          className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 min-h-[50vh] scroll-mt-28"
        >
          <h2 className="font-display text-2xl font-semibold">Experience</h2>
          <p className="mt-2 text-muted">Section placeholder.</p>
        </section>

        <section
          id="about"
          className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 min-h-[50vh] scroll-mt-28"
        >
          <h2 className="font-display text-2xl font-semibold">About</h2>
          <p className="mt-2 text-muted">Section placeholder.</p>
        </section>

        <section
          id="contact"
          className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 min-h-[50vh] scroll-mt-28"
        >
          <h2 className="font-display text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-muted">Section placeholder.</p>
        </section>
      </main>
    </>
  );
}
