import Image from "next/image";
import Header from "./component/layout/Header";
import Hero from "./component/section/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      {/* <div className="h-[300vh]"></div> */}
    </div>
  );
}
