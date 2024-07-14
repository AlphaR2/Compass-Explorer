"use client";
import { useState, useEffect } from "react";
import { useScreenWidth } from "@/utils/accountUtils";
import { TbCurrencySolana } from "react-icons/tb";
import ExplorerHeader from "@/components/ui/explorer-header";
import Tooltip from "@/components/reusables/tooltip";
import { FaWallet, FaCopy, FaCheckCircle } from "react-icons/fa";
import React from "react";
import { trxColumns, tokensColumns } from "@/components/ui/columns";
import { DataTable, NftDataTable } from "@/components/reusables/data-table";
import { useAddress } from "@/contexts/address";
import { useUserDetails } from "@/hooks/blockchain";

const Explorer = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("History");

  const { address } = useAddress();
  const [result, setResult] = useState<string | any>("");
  const {
    error,
    loading,
    balanceList,
    allAssets,
    userDetails,
    delegated,
    tokenList,
    nftList,
    domain,
    nativeBalance,
    accountValue,
  } = useUserDetails(address);

  useEffect(() => {
    setResult(address);
  }, []);

  const shortenAddress = (address: string): string => {
    if (!address) return "";

    const length = address.length;
    const prefix = address.slice(0, 27);
    const suffix = address.slice(length - 4, length);

    return `${prefix}....${suffix}`;
  };

  const screenWidth = useScreenWidth();

  const addressInput = result;

  const displayAddress =
    screenWidth > 600 ? addressInput : shortenAddress(addressInput);

  const handleCopy = () => {
    navigator.clipboard.writeText(addressInput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleSelection = (select: any) => {
    setSelection(select);
  };

  // console.log(tokenList);
  // console.log(nftList);

  const SELECTIONS = ["History", "Tokens", "NFTs", "DEFI"];

  return (
    <main>
      <ExplorerHeader />

      <div className="flex flex-col  w-full mt-12 h-full lg:mt-16 gap-12 px-4 lg:px-10">
        <section className="flex flex-col lg:flex-row pb-6  py-6 lg:px-9  border-b border-white/20  ">
          <div className="flex flex-col gap-6 lg:gap-2 w-full px-2">
            <div className="flex items-center gap-4 divide-x-2 divide-white/20">
              <span>
                <FaWallet
                  className="text-3xl text-[#fca311]
                
                lg:text-4xl"
                />
              </span>
              <h1 className="text-xl lg:text-3xl font-bold pl-4">Account</h1>
            </div>

            <div className="flex flex-col   w-full  gap-6 ">
              <h2 className="flex gap-4 text-xs  lg:text-base items-center font-semibold tracking-widest">
                {displayAddress}

                <button onClick={handleCopy} style={{ marginLeft: "8px" }}>
                  {copied ? (
                    <FaCheckCircle className="text-[#fca311]" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </h2>
            </div>
          </div>
        </section>

        <section className="mt-10 mb-28 ">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 mt-6 lg:gap-x-8">
            {/* 1 */}
            <div className="flex flex-col gap-8">
              <div className="border-4 items-center flex  justify-center text-center p-4 gap-2 bg-[#0e1c23]/60 flex-col sm:p-8 rounded-tl-3xl rounded-bl-3xl  shadow-2xl shadow-black/70  border-[#12232c]">
                <h2 className="text-xs font-bold"> SOL BALANCE</h2>
                {loading ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">...Loading</h1>
                  </span>
                ) : error ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">{error}</h1>
                  </span>
                ) : (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <TbCurrencySolana className="text-3xl text-[#fca311]" />
                    <h1 className="text-xl">{nativeBalance}</h1>
                  </span>
                )}
              </div>

              <div className="border-4 items-center flex  justify-center text-center p-4 gap-2 bg-[#0e1c23]/60 flex-col sm:p-8 rounded-tl-3xl rounded-bl-3xl  shadow-2xl shadow-black/70  border-[#12232c]">
                <h2 className="text-xs font-bold"> Net Worth</h2>

                {loading ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">...Loading</h1>
                  </span>
                ) : error ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">{error}</h1>
                  </span>
                ) : (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className="text-xl">${accountValue}</h1>
                  </span>
                )}
              </div>

              <div className="border-4 relative items-center flex  justify-center text-center p-4 gap-2 bg-[#0e1c23]/60 flex-col sm:p-8 rounded-tl-3xl rounded-bl-3xl  shadow-2xl shadow-black/70  border-[#12232c]">
                <h2 className="flex items-center gap-2 text-xs font-bold">
                  {" "}
                  TOTAL NUMBER OF ASSETS{" "}
                  <span>
                    <Tooltip text="The total number of tokens and nfts excluding unknowns " />
                  </span>
                </h2>
                {loading ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">...Loading</h1>
                  </span>
                ) : error ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">{error}</h1>
                  </span>
                ) : (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className="text-xl">{allAssets.length}</h1>
                  </span>
                )}
              </div>
            </div>

            {/* 2 */}
            <div className="border-4 items-center flex  flex-col  text-center p-4 gap-2 bg-[#0e1c23]/60  sm:p-8  shadow-black/70  shadow-2xl my-12 lg:my-0 border-[#12232c]">
              <h2 className="text-xs font-bold  pb-6 lg:pb-16 text-[#fca311] ">
                User Panel
              </h2>
              {loading ? (
                <span className="flex flex-row items-center font-semibold gap-2">
                  <h1 className=" text-[#fca311]">...Loading</h1>
                </span>
              ) : error ? (
                <span className="flex flex-row items-center font-semibold gap-2">
                  <h1 className=" text-[#fca311]">{error}</h1>
                </span>
              ) : (
                <ul className="flex flex-col w-full gap-8">
                  <li className="flex  w-full justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold">
                      Stake(SOL)
                      <span>
                        <Tooltip text="The amount of solana staked " />
                      </span>{" "}
                    </span>
                    <span>0 Sol</span>
                  </li>
                  <li className="flex  w-full justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold">
                      Domains
                    </span>{" "}
                    <span>{domain.length}</span>
                  </li>
                  <li className="flex  w-full justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold">
                      Domain List
                      <span></span>{" "}
                    </span>
                    <span>
                      {" "}
                      {domain.length > 0 ? domain.join(", ") : "none"}
                    </span>
                  </li>
                </ul>
              )}
            </div>

            {/* 3 */}

            <div className="flex flex-col gap-8">
              <div className="border-4 items-center flex  justify-center text-center p-4 gap-2 bg-[#0e1c23]/60 flex-col sm:p-8 rounded-tr-3xl rounded-br-3xl  shadow-2xl shadow-black/70  border-[#12232c]">
                <h2 className=" flex items-center gap-2 pb-4 text-xs font-bold">
                  <a href="https://community.magiceden.io/learn/revoke-token-approvals">
                    Token Approvals
                  </a>
                  <span>
                    <Tooltip text="How many tokens still have the token approval function enabled (Tap to learn more)" />
                  </span>
                </h2>
                {loading ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">...Loading</h1>
                  </span>
                ) : error ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">{error}</h1>
                  </span>
                ) : (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className="text-sm">{delegated.length}</h1>
                  </span>
                )}
              </div>

              <div className="border-4 items-center flex  justify-center text-center p-4 gap-2 bg-[#0e1c23]/60 flex-col sm:p-8 rounded-tr-3xl rounded-br-3xl  shadow-2xl shadow-black/70  border-[#12232c]">
                <h2 className="flex items-center gap-2 text-xs font-bold">
                  {" "}
                  Number of Tokens
                  <span>
                    <Tooltip text="The total number of tokens found in the address" />
                  </span>
                </h2>
                {loading ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">...Loading</h1>
                  </span>
                ) : error ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">{error}</h1>
                  </span>
                ) : (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className="text-xl">{tokenList.length || 0}</h1>
                  </span>
                )}
              </div>

              <div className="border-4 items-center flex  justify-center text-center p-4 gap-2 bg-[#0e1c23]/60 flex-col sm:p-8 rounded-tr-3xl rounded-br-3xl  shadow-2xl shadow-black/70  border-[#12232c]">
                <h2 className="flex items-center gap-2 text-xs font-bold">
                  {" "}
                  Number of NFTs{" "}
                  <span>
                    <Tooltip text="The total number of NFTS found in the address" />
                  </span>
                </h2>
                {loading ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">...Loading</h1>
                  </span>
                ) : error ? (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className=" text-[#fca311]">{error}</h1>
                  </span>
                ) : (
                  <span className="flex flex-row items-center font-semibold gap-2">
                    <h1 className="text-xl">{nftList.length || 0}</h1>
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="">
          <div className="flex gap-8  lg:gap-7 mb-20 px-2  pb-12 border-b border-white/20">
            {SELECTIONS.map((select, i) => (
              <button
                key={i}
                onClick={() => toggleSelection(select)}
                className={`rounded-2xl w-52 border-b shadow-inner lg:w-44 font-bold text-[10px] sm:text-[13px] md:text-sm text-center   lg:p-1 p-2  ${
                  selection.includes(select)
                    ? " border-[#fca311]"
                    : " border-white"
                }`}
              >
                {select}
              </button>
            ))}
          </div>
          {selection === "History" && (
            <div className=" bg-[#081420]  sm:p-6 rounded-tl-3xl rounded-br-3xl  shadow-2xl  border-[#34d4f7]/60">
              <DataTable
                className="border-[#12232c]  bg-[#060e16] "
                columns={trxColumns}
                data={userDetails}
              />
            </div>
          )}

          {selection === "Tokens" && (
            <div className=" bg-[#081420]  sm:p-6 rounded-tl-3xl rounded-br-3xl  shadow-2xl  border-[#34d4f7]/60">
              <DataTable
                className="border-[#12232c] bg-[#060e16] "
                columns={tokensColumns}
                data={tokenList}
              />
            </div>
          )}

          {selection === "NFTs" && (
            <div className=" bg-[#081420] mb-8 lg:mb-0  sm:p-6 rounded-tl-3xl rounded-br-3xl  shadow-2xl  border-[#34d4f7]/60">
              {<NftDataTable data={nftList} />}
            </div>
          )}

          {selection === "DEFI" && (
            <div className="border-4 mb-8 lg:mb-0 items-center flex w-full  flex-col  text-center  divide-y divide-gray-800  bg-[#0e1c23]/60   shadow-black/70 rounded-xl shadow-2xl   border-[#12232c]">
              <h1 className="text-2xl text-[#fca311] font-black animate-pulse py-12">
                ....Coming Soon!!
              </h1>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Explorer;
