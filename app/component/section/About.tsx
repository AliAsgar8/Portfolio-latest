"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import image from "../../public/me-sitting.37df8593.webp";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // SECTION animation (first)
  const sectionScaleValue = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const sectionBorderRadiusValue = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["50px", "0px"]
  );
  const sectionScale = useSpring(sectionScaleValue, {
    stiffness: 100,
    damping: 20,
  });
  const sectionBorderRadius = useSpring(sectionBorderRadiusValue, {
    stiffness: 100,
    damping: 20,
  });

  // IMAGE animation (second, starts after section)
  const imageScaleXValue = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const imageScaleX = useSpring(imageScaleXValue, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-gray-300 flex justify-center"
    >
      {/* Section */}
      <motion.div
        style={{ scale: sectionScale, borderRadius: sectionBorderRadius }}
        className="sticky top-0 bg-white h-screen w-screen flex items-center justify-center flex-col"
      >
        {/* Image */}
        {/* <motion.div style={{ scaleX: imageScaleX }}>
          <Image src={image} width={1200} height={200} alt="image" />
        </motion.div> */}

        <h1 className="text-4xl font-bold mt-8">This is motion div</h1>
      </motion.div>
    </section>
  );
};

export default About;
