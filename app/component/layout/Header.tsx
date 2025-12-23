import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="flex justify-between items-center pt-5 px-20 py-2 font-serif">
      <div>
        {/* <Image src="/images/logo.png" width={100} height={25} alt="logo" /> */}
        <h1 className="text-4xl">
          Ali<span className="text-pink-700">.</span>
        </h1>
      </div>
      <div className="flex gap-x-5">
        <Link href="/">About</Link>
        <Link href="/">Work</Link>
        <Link href="/">Contact</Link>
      </div>
    </nav>
  );
};

export default Header;
