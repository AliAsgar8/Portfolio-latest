import Image from "next/image";
import Header from "./component/layout/Header";
import Hero from "./component/section/Hero";
import About from "./component/section/About";
import Experience from "./component/section/Experience";
import SmoothScrollProvider from "./lib/SmoothScroll";
import ProjectCard from "./component/section/ProjectCard";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Header />
      <Hero />
      <About />
      <ProjectCard />
      <Experience />
      <div className="h-[300vh] bg-green-500"></div>
    </SmoothScrollProvider>
  );
}
