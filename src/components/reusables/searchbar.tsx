"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import Link from "next/link";
import { useAddress } from "@/contexts/address";
import { getDomainDetails } from "@/utils/blockchain";

// here make sure you run conditionals for address, trx and tokens whilst changing this useState to be more general

export const ExplorerSearchbar = ({ className }: { className: string }) => {
  const { address, setAddress } = useAddress();
  const [input, setInput] = useState<string>("");
  const [inputModal, setInputModal] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("");
  const [refinedAddress, setRefinedAddress] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    setInputModal(!!inputValue);
  };

  const handleClear = () => {
    setAddress("");
    setInput("");
    setInputType("address");
    setInputModal(false);
    setRefinedAddress("");
  };

  const setType = async (input: string) => {
    if (input.endsWith(".sol")) {
      const owner: string = await getDomainDetails(input); // Assuming getDomainDetails returns a string
      setRefinedAddress(owner);
      setInputType("Domain");
    } else if (input.length === 88) {
      setRefinedAddress(input);
      setInputType("Transaction");
    } else if (input.length <= 88) {
      setRefinedAddress(input);
      setInputType("Address");
    }
  };

  useEffect(() => {
    if (input) {
      setType(input);
    }
  }, [input]);

  useEffect(() => {
    if (refinedAddress) {
      setAddress(refinedAddress);
    }
  }, [refinedAddress, setAddress]);

  // console.log(input);
  // console.log(refinedAddress);

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col relative gap-2 w-full">
          <div className="flex items-center space-x-3">
            <input
              required
              id="tokenAddress"
              name="tokenAddress"
              type="text"
              placeholder="Search by address and trx for now 😀"
              value={input}
              onChange={handleInputChange}
              className={`${className} flex-1 relative pl-6 pr-24 bg-[#0e1c23] text-white text-xs font-medium  lg:text-base rounded-lg focus:outline-none focus:bg-[#0e1c23] active:bg-[#0e1c23] focus-within:bg-[#0e1c23] overflow-hidden text-ellipsis whitespace-nowrap`}
            />
            {address.length == 88 ? (
              <Link
                href={{
                  pathname: `/trx/${address}`,
                }}
                className="bg-[#fca311] rounded-lg relative right-[65px]   p-3"
              >
                <FaSearch className="text-2xl text-black" />
              </Link>
            ) : (
              <Link
                href={{
                  pathname: `/address/${address}`,
                }}
                className="bg-[#fca311] rounded-lg relative right-[65px]  p-3"
              >
                <FaSearch className="text-2xl text-black" />
              </Link>
            )}
          </div>
          {inputModal && (
            <div className="h-24 absolute w-[85%] sm:w-full  top-16 divide-y flex flex-col gap-2 mt-2 px-2 lg:pl-6 lg:pr-24 bg-[#0e1c23] text-white rounded-lg focus:outline-none focus:bg-[#0e1c23] active:bg-[#0e1c23] divide-gray-800 focus-within:bg-[#0e1c23] overflow-hidden text-ellipsis whitespace-nowrap">
              <div className="flex w-full px-1 py-1 items-center justify-between">
                <h1 className="text-[#fca311]">{inputType}</h1>
                {address && (
                  <button
                    onClick={handleClear}
                    title="cancel"
                    className=" rounded-lg text-3xl text-[#fca311]"
                  >
                    <SlClose className="text-xl" />
                  </button>
                )}
              </div>
              {address.length == 88 ? (
                <Link
                  href={{
                    pathname: `/trx/${address}`,
                  }}
                >
                  <button className="pt-4 text-xs font-medium  lg:text-base">
                    {refinedAddress}
                  </button>
                </Link>
              ) : (
                <Link
                  href={{
                    pathname: `/address/${address}`,
                  }}
                >
                  <button className="pt-4 text-xs font-medium  lg:text-base">
                    {refinedAddress}
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
