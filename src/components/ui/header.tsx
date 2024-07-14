import React from "react";
import { FaCompass } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full bg-[#0b151a] flex justify-between items-center py-5 px-4 sm:px-12 lg:px-28  ">
      <Link href="/" className="flex items-center gap-1">
        <span>
          <FaCompass className="text-4xl lg:text-2xl text-[#fca311]" />
        </span>
        <h1 className="flex text-[#fca311] text-xl font-semibold">
          Compass Explorer
        </h1>
      </Link>

      <ul className="hidden md:flex gap-8 text-lg font-semibold">
        <li>Explore</li>
        <li>Tools</li>
        <li>Resources</li>
      </ul>
    </div>
  );
};

export default Header;
