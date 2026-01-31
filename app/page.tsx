import Image from "next/image";
import Header from "@/app/component/layout/Header";
import Hero from "@/app/component/section/Hero";
import About from "@/app/component/section/About";
import Experience from "@/app/component/section/Experience";
import SmoothScrollProvider from "@/app/lib/SmoothScroll";
import ProjectCard from "@/app/component/section/ProjectCard";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Header />
      <Hero />
      <About />
      {/* <ProjectCard /> */}
      {/* <Experience /> */}
      <div className="h-[300vh] bg-green-500"></div>
    </SmoothScrollProvider>
  );
}
