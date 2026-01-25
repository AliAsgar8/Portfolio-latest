"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import PortfolioImage from "@/public/images/portfolio-image.jpeg";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // SECTION animation
  const sectionScaleValue = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const sectionBorderRadiusValue = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["50px", "0px"],
  );

  const sectionScale = useSpring(sectionScaleValue, {
    stiffness: 100,
    damping: 20,
  });

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

  // SVG PATH SCROLL DRAW
  useEffect(() => {
    const path = pathRef.current;
    const section = containerRef.current;

    if (!path || !section) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    let ticking = false;

    const updatePath = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const progress = (scrollY + windowHeight - sectionTop) / sectionHeight;

      const clamped = Math.min(Math.max(progress, 0), 1);
      path.style.strokeDashoffset = `${pathLength * (1 - clamped)}`;

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePath);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    updatePath();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[rgb(30,30,30)] overflow-hidden"
    >
      {/* SVG PATH — RESPONSIVE */}
      <svg
        viewBox="0 0 319 391"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="
          absolute
          left-1 sm:left-6 lg:left-10
          top-10 sm:top-0
          h-[40%] sm:h-[60%] lg:h-full
          w-auto
          opacity-100
          z-50
        "
      >
        <path
          ref={pathRef}
          d="M0.870384 16.492C107.119 10.3165 124.584 22.991 116.87 60.492C83.2064 190.954 110.032 212.596 202.87 200.492C303.703 199.189 319.192 218.314 290.87 279.492C278.491 376.632 241.93 390.71 136.87 361.492"
          stroke="#D6F446"
          strokeWidth="8"
          fill="none"
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
          style={{ scaleX: imageScaleX }}
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
              high-performance applications using modern frontend technologies.
            </span>
          </h1>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
