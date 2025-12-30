"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleLogic = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Mobile: always hamburger
        setShowHamburger(true);
        setIsOpen(false);
      } else {
        // Desktop: scroll based
        if (window.scrollY > 50) {
          setShowHamburger(true);
        } else {
          setShowHamburger(false);
          setIsOpen(false);
        }
      }
    };

    handleLogic(); // run once on load
    window.addEventListener("scroll", handleLogic);
    window.addEventListener("resize", handleLogic);

    return () => {
      window.removeEventListener("scroll", handleLogic);
      window.removeEventListener("resize", handleLogic);
    };
  }, []);

  return (
    <header>
      <nav className="flex justify-between items-center pt-5 mx-6 md:mx-20 pb-2 font-serif border-b border-dashed">
        {/* Logo */}
        <h1 className="text-4xl">
          Ali<span className="text-pink-700">.</span>
        </h1>

        {/* Desktop Menu */}
        {!showHamburger && (
          <div className="hidden md:flex gap-x-5">
            <Link href="/">About</Link>
            <Link href="/">Work</Link>
            <Link href="/">Contact</Link>
          </div>
        )}
      </nav>

      {/* Mobile / Hamburger Slide Menu */}
      <AnimatePresence>
        {showHamburger && (
          <button
            className="fixed right-0 top-0 md:top-10 flex flex-col justify-center items-center gap-y-1 z-20 mx-6 md:mx-24 border-2 h-16 w-16 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`${
                isOpen ? "rotate-45 translate-y-2" : ""
              } w-7 h-[2px] bg-gray-700 transition`}
            />
            <span
              className={`${
                isOpen ? "opacity-0" : ""
              } w-7 h-[2px] bg-gray-700 transition`}
            />
            <span
              className={`${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              } w-7 h-[2px] bg-gray-700 transition`}
            />
          </button>
        )}
        {isOpen && showHamburger && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 right-0 w-full sm:w-[50%] h-[100vh] bg-black text-white flex flex-col items-center justify-center gap-10"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-3xl"
            >
              About
            </Link>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-3xl"
            >
              Work
            </Link>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-3xl"
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
