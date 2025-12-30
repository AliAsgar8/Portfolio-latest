"use client";
import { useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import ScrollNeonLine from "../../lib/scrollNeonLine";

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;

    if (!path || !section) return;

    const pathLength = path.getTotalLength();

    // Initial setup
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    let ticking = false;

    const updatePath = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress ONLY for this section
      const progress = (scrollY + windowHeight - sectionTop) / sectionHeight;

      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      path.style.strokeDashoffset = `${pathLength * (1 - clampedProgress)}`;

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

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div
      ref={sectionRef}
      className="relative h-[200vh] bg-gray-300 flex justify-between items-center px-20"
    >
      {/* SVG */}
      <svg
        viewBox="0 0 319 391"
        fill="none"
        className="absolute left-10 top-0 h-full"
      >
        <path
          ref={pathRef}
          d="M0.870384 16.492C107.119 10.3165 124.584 22.991 116.87 60.492C83.2064 190.954 110.032 212.596 202.87 200.492C303.703 199.189 319.192 218.314 290.87 279.492C278.491 376.632 241.93 390.71 136.87 361.492"
          stroke="#00f0ff"
          strokeWidth="10"
          fill="none"
        />
      </svg>
      <ScrollNeonLine targetRef={sectionRef} />
    </div>
  );
};

export default Experience;
