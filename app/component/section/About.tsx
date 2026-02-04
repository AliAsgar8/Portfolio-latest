"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import PortfolioImage from "@/public/images/portfolio-image.jpeg";
import SkillCard from "@/app/component/section/SkillCard";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // SECTION animation
  const sectionScaleValue = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const sectionScale = useSpring(sectionScaleValue, {
    stiffness: 100,
    damping: 20,
  });

  const sectionBorderRadiusValue = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["50px", "0px"],
  );
  const sectionBorderRadius = useSpring(sectionBorderRadiusValue, {
    stiffness: 100,
    damping: 20,
  });

  // IMAGE animation
  const imageScaleXValue = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const imageScaleX = useSpring(imageScaleXValue, {
    stiffness: 50,
    damping: 25,
  });

  // SVG calculate path
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <motion.section
        ref={containerRef}
        className="relative bg-[rgb(30,30,30)] overflow-hidden"
      >
        <svg
          viewBox="0 0 272 529"
          fill="none"
          className="absolute right-0  top-0 h-full z-40"
        >
          <motion.path
            d="M270.594 14.9586C270.594 14.9586 189.594 20.9586 136.594 49.9587C83.594 78.9588 64.5938 118.958 70.5939 154.959C76.5939 190.959 97.5938 256.959 51.5939 279.959C5.59406 302.959 11.5938 317.959 23.594 332.959C35.5943 347.959 133.594 363.959 125.594 418.959C117.594 473.959 45.5938 528.959 31.5938 509.959"
            stroke="#E3FF54"
            strokeWidth="5"
            fill="none"
            pathLength={1}
            style={{ pathLength }}
          />
        </svg>

        {/* MAIN SECTION */}
        <motion.div
          style={{ scale: sectionScale, borderRadius: sectionBorderRadius }}
          className="
        top-0
        bg-[rgb(231,231,231)]
        w-screen
        flex flex-col
        gap-12
        pb-20
        relative
        z-20
        "
        >
          {/* IMAGE */}
          <motion.div
            // style={{ scaleX: imageScaleX }}
            className="flex justify-center mt-20 px-4"
          >
            <Image
              src={PortfolioImage}
              alt="Portfolio Image"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="
            object-cover
            w-full
            max-w-6xl
            h-[55vh]
            sm:h-[70vh]
            lg:h-[90vh]
            rounded-xl
            "
            />
          </motion.div>

          {/* TEXT */}
          <div className="container mx-auto px-4 sm:px-6">
            <h1
              className="
            font-semibold
            leading-tight
            text-xl
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
            max-w-5xl
            "
            >
              <span className="block">
                I'm Ali Asgar – a frontend developer with a strong focus on
                building clean, responsive, and user-friendly web interfaces.
              </span>

              <span className="block mt-4 text-gray-600">
                I enjoy transforming designs into functional, accessible, and
                high-performance applications using modern frontend
                technologies.
              </span>
            </h1>
          </div>
        </motion.div>
      </motion.section>
      <SkillCard />
    </>
  );
};

export default About;
