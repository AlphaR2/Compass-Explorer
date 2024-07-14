"use client";
import { ExplorerSearchbar } from "@/components/reusables/searchbar";
import { SiSolana, SiCodeblocks, SiDatabricks } from "react-icons/si";
import { FaCoins } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";

import Header from "@/components/ui/header";

import { useAssetData } from "@/hooks/blockchain";
import { useEffect, useState } from "react";

export default function Home() {
  const address: string = "So11111111111111111111111111111111111111112";
  const {
    price,
    blockHeight,
    epoch,
    trxCount,
    CurrentTps,
    trendingData,
    marketCap,
    loading,
    error,
  } = useAssetData(address);



  return (
    <main className="flex flex-col">
      <Header />
      <div className="w-full flex flex-col gap-16 h-full py-20 pl-4 md:px-12 lg:px-28 ">
        <section>
          <div className="flex flex-col gap-5">
            <h1 className=" text-xl lg:text-3xl font-semibold">
              Compass Blockchain Explorer
            </h1>

            <ExplorerSearchbar className="w-full h-14" />
          </div>
        </section>

        <section className="flex w-full lg:mt-16">
          <div className="flex flex-row items-center justify-center  gap-[31px] pr-4 border border-[#fca311]/10 rounded-lg w-[96%] h-18">
            <div className="relative w-full  overflow-hidden whitespace-nowrap"></div>
          </div>
        </section>

        <section>
          {loading ? (
            <div className="bg-[#0e1c23]/60 w-[96%] flex items-center justify-center h-72 rounded-xl gap-6 px-4 divide-x divide-white/10 py-6">
              <h1 className="lg:text-2xl text-[#fca311] font-black animate-pulse">
                .... Loading Data{" "}
              </h1>
            </div>
          ) : error ? (
            <div className="bg-[#0e1c23]/60 w-[96%] flex items-center justify-center h-72 rounded-xl gap-6 px-4 divide-x divide-white/10 py-6">
              <h1 className="lg:text-2xl text-[#fca311] font-black">
                Error: {error}
              </h1>
            </div>
          ) : (
            <div className="bg-[#0e1c23]/60 w-[96%] flex flex-col xl:grid xl:grid-cols-3  xl:h-72 rounded-xl gap-6 px-4 xl:divide-x divide-white/10 py-6">
              <div className=" flex flex-col justify-between  xl:justify-center  xl:gap-12 divide-y  divide-white/10  ">
                <div className="flex p-5 gap-24 sm:gap-72 xl:gap-5 pb-8 xl:pb-0">
                  <span className="bg-[#fca311] rounded-full w-11 h-11  p-3">
                    <SiSolana className="text-xl text-black" />
                  </span>

                  <div className="flex flex-col gap-4">
                    <h1 className="text-xs font-medium">SOL Price </h1>
                    <h2 className="xl:text-2xl font-bold">${price}</h2>
                  </div>
                </div>

                <div className="flex p-5  gap-24 sm:gap-72 xl:gap-5 pt-8 xl:pt-10">
                  <span className="bg-[#fca311] rounded-full w-11 h-11  p-3">
                    <FaCoins className="text-xl text-black" />
                  </span>

                  <div className="flex flex-col gap-4">
                    <h1 className="text-xs font-medium">MarketCap </h1>
                    <h2 className="xl:text-2xl font-bold">${marketCap}</h2>
                  </div>
                </div>
              </div>

              {/* 2 */}

              <div className=" flex flex-col justify-between  xl:justify-center xl:gap-12 divide-y divide-white/10 border-t border-white/10 xl:px-4 xl:border-t-0 ">
                <div className="flex p-5  gap-24 sm:gap-72 xl:gap-5 pt-8 xl:pt-5 pb-8 xl:pb-0  ">
                  <span className="bg-[#fca311] rounded-full w-11 h-11  p-3">
                    <SiDatabricks className="text-xl text-black" />
                  </span>

                  <div className="flex flex-col gap-4">
                    <h1 className="text-xs font-medium">Block Height </h1>
                    <h2 className="xl:text-2xl font-bold">{blockHeight}</h2>
                  </div>
                </div>

                <div className="flex p-5  gap-24 sm:gap-72 xl:gap-5 pt-8 xl:pt-10   ">
                  <span className="bg-[#fca311] rounded-full w-11 h-11  p-3">
                    <SiCodeblocks className="text-xl text-black" />
                  </span>

                  <div className="flex flex-col gap-4">
                    <h1 className="text-xs font-medium">Epoch </h1>
                    <h2 className="xl:text-2xl font-bold">{epoch}</h2>
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div className=" flex flex-col xl:justify-center xl:gap-12 justify-between divide-y divide-white/10  xl:px-4 border-t xl:border-t-0 border-white/10  ">
                <div className="flex p-5  gap-24 sm:gap-72 xl:gap-5 pt-8 xl:pt-0 pb-10 xl:pb-0  ">
                  <span className="bg-[#fca311] rounded-full w-11 h-11  p-3">
                    <BiTransferAlt className="text-xl text-black" />
                  </span>

                  <div className="flex flex-col gap-4">
                    <h1 className="text-xs font-medium">Current TPS </h1>

                    <h2 className=" flex gap-2 items-center xl:text-2xl font-bold">
                      {CurrentTps}
                      <span className="text-xs xl:text-lg font-normal">
                        txns/sec
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="flex p-5  gap-24 sm:gap-72 xl:gap-5 pt-8  pb-8 xl:pb-0 xl:pt-10 ">
                  <span className="bg-[#fca311] rounded-full w-11 h-11  p-3">
                    <BiTransferAlt className="text-xl text-black" />
                  </span>

                  <div className="flex flex-col gap-4">
                    <h1 className="text-xs font-medium">Total Transactions </h1>
                    <h2 className=" flex gap-2 items-center xl:text-2xl font-bold">
                      {trxCount}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
