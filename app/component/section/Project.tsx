"use client";
import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type ProjectProps = {
  i: number;
  title: string;
  image: string;
  description: string;
  color: string;
};

const Project = ({ i, title, image, description, color }: ProjectProps) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  return (
    <div
      ref={container}
      className="h-[100vh] flex justify-center items-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          top: `calc(-10% + ${i * 25}px`,
        }}
        className="flex justify-center items-center relative  px-10 rounded-3xl h-[400px] w-[800px]"
      >
        <div className="text-white w-1/2">
          <h3 className="text-3xl font-bold">{title}</h3>
          <p>{description}</p>
        </div>
        <motion.div style={{ scale }} className="w-1/2">
          <Image src={image} alt={title} width={300} height={200} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Project;
