import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const Tooltip = ({ text }: { text: string }) => {
  const [modal, setModal] = useState<Boolean>(false);

  const handleMouseEnter = () => {
    setModal(true);
  };

  const handleMouseLeave = () => {
    setModal(false);
  };

  return (
    <div className="relative flex items-center">
      <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <FaInfoCircle className="text-gray-500 cursor-pointer" />
      </button>

      {modal && (
        <div className="absolute left-24 transform -translate-x-1/2 mb-2 w-40 p-2 text-black text-xs font-bold rounded-md shadow-lg transition-opacity duration-300 bg-[#fca311] pointer-events-none group-hover:opacity-100 tracking-wider">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
