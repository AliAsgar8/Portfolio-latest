"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

const StickyCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMove = {
    x: useSpring(mouseX),
    y: useSpring(mouseY),
  };

  const onMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX - 12);
    mouseY.set(e.clientY - 12);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        left: smoothMove.x,
        top: smoothMove.y,
      }}
      className="fixed h-6 w-6 rounded-full border-2 border-gray-400 pointer-events-none"
    />
  );
};

export default StickyCursor;
