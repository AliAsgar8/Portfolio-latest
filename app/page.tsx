import { Container } from "@/app/components/Container";
import { Header } from "@/app/components/Header";
import { getPortfolio } from "@/app/lib/getPortfolio";

export default function Home() {
  const data = getPortfolio();

  return (
    <>
      <div id="top" />
      <Header name={data.name} nav={data.nav} contactHref="#contact" />

      <main className="flex flex-1 flex-col pt-28">
        <Container
          as="section"
          className="flex min-h-[70vh] flex-col justify-center gap-3 py-16"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            Header preview
          </p>
          <h1 className="font-display max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Scroll to see the compact bar.
          </h1>
          <p className="max-w-md text-muted">
            Top state stays open with name + nav. After a short scroll it
            settles into a floating glass bar.
          </p>
        </Container>

        <Container
          as="section"
          id="work"
          className="min-h-[50vh] scroll-mt-28 py-16"
        >
          <h2 className="font-display text-2xl font-semibold">Work</h2>
          <p className="mt-2 text-muted">Section placeholder.</p>
        </Container>

        <Container
          as="section"
          id="experience"
          className="min-h-[50vh] scroll-mt-28 py-16"
        >
          <h2 className="font-display text-2xl font-semibold">Experience</h2>
          <p className="mt-2 text-muted">Section placeholder.</p>
        </Container>

        <Container
          as="section"
          id="about"
          className="min-h-[50vh] scroll-mt-28 py-16"
        >
          <h2 className="font-display text-2xl font-semibold">About</h2>
          <p className="mt-2 text-muted">Section placeholder.</p>
        </Container>

        <Container
          as="section"
          id="contact"
          className="min-h-[50vh] scroll-mt-28 py-16"
        >
          <h2 className="font-display text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-muted">Section placeholder.</p>
        </Container>
      </main>
    </>
  );
}
