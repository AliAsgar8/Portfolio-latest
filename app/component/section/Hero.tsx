import React from "react";

const Hero = () => {
  return (
    <section className="container grid grid-cols-12 gap-4 pt-14 pb-10">
      <div className="grid gap-y-4 col-span-6">
        <h1 className="text-3xl">Hello, I’m Ali Asgar</h1>
        <h2 className="text-6xl font-medium">
          Frontend Developer Designing and developing web interfaces.
        </h2>
        <p className="text-xl font-normal max-w-2xl">
          I build interactive, clean, and meaningful web experiences using
          modern frontend technologies. Focused on clean design and thoughtful
          user interaction.
        </p>

        {/* Button aligned left & small */}
        <div className="mt-4">
          <button className="px-6 py-2 border-2 border-gray-400 rounded-full text-sm cursor-pointer inline-block">
            Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
