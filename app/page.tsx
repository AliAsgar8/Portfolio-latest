import { AboutSection } from "@/app/components/AboutSection";
import { ContactSection } from "@/app/components/ContactSection";
import { ExperienceSection } from "@/app/components/ExperienceSection";
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

      <main className="flex flex-1 flex-col overflow-x-clip pt-28">
        <Hero data={data} />
        <WorkSection projects={data.projects} />
        <ExperienceSection items={data.experience} />
        <AboutSection about={data.about} skills={data.skills} />
        <ContactSection
          headline={data.contact.headline}
          socials={data.socials}
          name={data.name}
        />
      </main>
    </>
  );
}
