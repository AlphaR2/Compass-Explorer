import React from "react";
import { FaCompass } from "react-icons/fa";
import { ExplorerSearchbar } from "../reusables/searchbar";
import Link from "next/link";

const ExplorerHeader = () => {
  return (
    <div className="w-full bg-[#0b151a] flex flex-row items-center justify-between py-5 px-3 md:px-12 lg:px-28  ">
      <div className="flex flex-row relative w-full items-center gap-6 ">
        <Link href="/" className="flex items-center gap-1">
          <span>
            <FaCompass className="text-3xl lg:text-2xl text-[#fca311]" />
          </span>
          <h1 className="hidden lg:flex text-[#fca311] text-xl font-semibold">
            Compass Explorer
          </h1>
        </Link>

        <ExplorerSearchbar className=" lg:w-[450px] h-14" />
      </div>

      <ul className=" hidden lg:flex gap-8 text-lg font-semibold">
        <li>Explore</li>
        <li>Tools</li>
        <li>Resources</li>
      </ul>
    </div>
  );
};

export default ExplorerHeader;
