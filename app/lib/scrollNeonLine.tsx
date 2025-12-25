"use client";

import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  targetRef: React.RefObject<HTMLElement | null>;
};

export default function ScrollNeonLine({ targetRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end end"],
  });

  const neonHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-0 h-full flex items-start">
        {/* Base line */}
        <div className="w-[3px] h-full bg-black opacity-40 absolute" />

        {/* Neon animated line */}
        <motion.div
          className="w-[3px] bg-[#00f0ff] shadow-[0_0_12px_#00f0ff] origin-top absolute"
          style={{ height: neonHeight }}
        />
      </div>
    </div>
  );
}
