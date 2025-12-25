"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // scroll animation duration
      smooth: true, // enable smooth scrolling
      smoothTouch: true, // smooth scrolling on touch devices
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
