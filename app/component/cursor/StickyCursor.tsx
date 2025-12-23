"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const StickyCursor = () => {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 150, damping: 20 }),
    y: useSpring(mouse.y, { stiffness: 150, damping: 20 }),
  };

  const onMouseMove = (e: MouseEvent) => {
    // center cursor (half of width/height = 12)
    mouse.x.set(e.clientX - 12);
    mouse.y.set(e.clientY - 12);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  });

  return (
    <motion.div
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
      className="fixed w-7 h-7 rounded-full bg-transparent border-2 border-gray-700 pointer-events-none z-50"
    />
  );
};

export default StickyCursor;
