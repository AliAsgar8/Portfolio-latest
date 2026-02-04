"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const SkillCard = () => {
  const cardSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardSectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    /* OUTER wrapper → gives scroll space */
    <section
      ref={cardSectionRef}
      className="relative h-[300vh]  bg-[rgb(231,231,231)]"
    >
      {/* STICKY container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-x-20 px-10 md:px-20">
          <div className="h-125 w-125 border-2 border-black shrink-0" />
          <div className="h-125 w-125 border-2 border-black shrink-0" />
          <div className="h-125 w-125 border-2 border-black shrink-0" />
          <div className="h-125 w-125 border-2 border-black shrink-0" />
          <div className="h-125 w-125 border-2 border-black shrink-0" />
          <div className="h-125 w-125 border-2 border-black shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default SkillCard;
