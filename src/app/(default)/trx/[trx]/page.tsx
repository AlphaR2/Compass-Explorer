"use client";

import { useEffect, useState } from "react";
import { FaWallet, FaCopy, FaCheckCircle } from "react-icons/fa";
import { TbArrowsTransferDown } from "react-icons/tb";
import {
  getTransactionTrx,
  formatProgramLogMessages,
} from "@/utils/blockchain";
import { solBalanceColumns } from "@/components/ui/columns";
import { DataTable } from "@/components/reusables/data-table";
import { useScreenWidth } from "@/utils/accountUtils";
import { useAddress } from "@/contexts/address";
import ExplorerHeader from "@/components/ui/explorer-header";
import { useSolBalance } from "@/hooks/blockchain";
import React from "react";

const TransactionHash = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [trxLoading, setTrxLoading] = useState<boolean>(true);
  const [trxError, setTrxError] = useState<string | any>(null);
  const [data, setData] = useState<any>("");
  const [selection, setSelection] = useState<string>("Overview");
  const [rawDataDisplay, setRawDataDisplay] = useState<boolean>(false);
  const { address } = useAddress();

  const { postBalances, preBalances, allAddress, balanceList, loading, error } =
    useSolBalance(data);

  const [result, setResult] = useState<string | any>("");

  useEffect(() => {
    setResult(address);
    getTrx();
  }, []);

  // main fxn call
  const getTrx = async () => {
    try {
      const response = await getTransactionTrx(address, 1);
      setData(response);
    } catch (error) {
      console.error("Error Fetching Data:", error);
      setTrxError("No SOL Balance Change Detected");
    } finally {
      setTrxLoading(false);
    }
  };

  // time conversion
  const convertTime = (time: any) => {
    if (!time) {
      return 0;
    }

    const blockTime = time;
    const date = new Date(blockTime * 1000);
    const utcTime = date.toUTCString();

    return utcTime;
  };

  // program logs
  const programLogs = (data: any): any => {
    if (!data) {
      console.log("Log Messages not available");
      return [];
    }

    const formatLogs = formatProgramLogMessages(data.meta?.logMessages);
    return formatLogs;
  };

  const formatLogs = programLogs(data);

  // address shortening

  const shortenAddress = (address: string): string => {
    if (!address) return "";

    const length = address.length;
    const prefix = address.slice(0, 10);
    const suffix = address.slice(length - 10, length);

    return `${prefix}....${suffix}`;
  };

  const screenWidth = useScreenWidth();

  const trxInput = result;

  const displayTrx = screenWidth > 2000 ? trxInput : shortenAddress(trxInput);

  // signer config

  const publicKey = data.transaction?.message?.accountKeys[0];

  let addressInput = publicKey
    ? publicKey?.[Symbol?.toStringTag]
    : `Public Key not found`;

  if (addressInput.startsWith("PublicKey(") && addressInput.endsWith(")")) {
    addressInput = addressInput.slice(10, -1);
  }

  const displayAddress =
    screenWidth > 900 ? addressInput : shortenAddress(addressInput);

  // //////////////////////////////

  const handleCopy = () => {
    navigator.clipboard.writeText(addressInput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const toggleSelection = (select: any) => {
    setSelection(select);
  };

  const SELECTIONS = ["Overview", "SOL Balance Change", "Token Balance Change"];

  return (
    <main>
      <ExplorerHeader />
      <div className="flex flex-col gap-16 mt-12">
        <section className="flex flex-col lg:flex-row pb-6 px-2 py-6 lg:px-9  border-b border-white/20  ">
          <div className="flex flex-col gap-8 lg:gap-8 w-full px-3 lg:px-12">
            <div className="flex items-center gap-4 divide-x-2 divide-white/20">
              <span>
                <TbArrowsTransferDown
                  className="text-3xl text-[#fca311]
                
                lg:text-4xl"
                />
              </span>
              <h1 className="text-xl lg:text-3xl  overflow-hidden overflow-ellipsis font-bold pl-4">
                Tranasaction
              </h1>
            </div>

            <div className="flex flex-col   w-full  gap-6 ">
              <h2 className="flex gap-4 text-xs  lg:text-sm items-center font-semibold tracking-widest  text-ellipsis">
                {displayTrx}
              </h2>
            </div>
          </div>
        </section>

        <section className="mx-3 lg:mx-20 mb-32 rounded-2xl pt-6  pb-20 px-2 lg:px-8 bg-[#12232c]/40 ">
          <div className="flex gap-2  lg:gap-7  mb-4 lg:px-2  pb-4 ">
            {SELECTIONS.map((select, i) => (
              <button
                key={i}
                onClick={() => toggleSelection(select)}
                className={` w-52 border-b lg:w-44 font-black lg:font-bold text-[7px] lg:text-[10px]  md:text-sm text-center   lg:p-1 p-2  ${
                  selection.includes(select)
                    ? " border-[#fca311]/40"
                    : " border-white/30"
                }`}
              >
                {select}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="bg-[#0e1c23]/60 w-[96%] flex items-center justify-center h-72 rounded-xl gap-6 px-4 divide-x divide-white/10 py-6">
              <h1 className="lg:text-2xl text-[#fca311] font-black animate-pulse">
                .... Loading Data{" "}
              </h1>
            </div>
          ) : error && trxError ? (
            <div className="bg-[#0e1c23]/60 w-[96%] flex items-center justify-center h-72 rounded-xl gap-6 px-4 divide-x divide-white/10 py-6">
              <h1 className="lg:text-2xl text-[#fca311] font-black">
                Error: {error}{" "}
              </h1>
            </div>
          ) : (
            selection === "Overview" && (
              <div className="flex flex-col gap-12">
                <div className="border-4 items-center flex w-full  flex-col  text-center  divide-y divide-gray-800  bg-[#0e1c23]/60   shadow-black/70 rounded-xl shadow-2xl   border-[#12232c]">
                  {/* start */}
                  <div className="flex w-full justify-between py-6 bg-[#060e16] px-8 lg:py-8 text-xs font-black  text-[#fca311]  rounded-t-xl ">
                    <span>Transaction Details </span>
                  </div>

                  {/* //////// */}
                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Signature{" "}
                    </span>
                    <span className="flex items-center gap-2 text-xs md:text-base text-ellipsis whitespace-nowrap overflow-hidden">
                      <button
                        onClick={handleCopy}
                        style={{ marginLeft: "8px" }}
                      >
                        {copied ? (
                          <FaCheckCircle className="text-[#fca311]" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                      {displayTrx}
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Timestamp{" "}
                    </span>
                    <span className="flex text-xs md:text-base ">
                      {" "}
                      {convertTime(data.blockTime)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Status{" "}
                    </span>
                    <span className="flex text-xs md:text-base   items-center gap-4">
                      <FaCheckCircle className="text-[#fca311]" />
                      {data.meta?.status?.Ok !== undefined
                        ? "Success"
                        : "Failure"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Slot{" "}
                    </span>
                    <span className="flex text-xs md:text-base   items-center gap-4">
                      {data.slot}
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Recent Blockhash{" "}
                    </span>
                    <span className="flex text-[11px] sm:text-xs md:text-base   items-center gap-4">
                      {data.transaction?.message?.recentBlockhash}
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Compute Units Consumed{" "}
                    </span>
                    <span className="flex text-xs md:text-base   items-center gap-4">
                      {data.meta?.computeUnitsConsumed} CU
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Transaction Version{" "}
                    </span>
                    <span className="flex items-center text-xs md:text-base  gap-4">
                      {data.version}
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium lg:font-black md:text-base ">
                      Signer
                    </span>
                    <span className="flex items-center gap-2 text-xs md:text-base ">
                      {" "}
                      <button
                        onClick={handleCopy}
                        style={{ marginLeft: "8px" }}
                      >
                        {copied ? (
                          <FaCheckCircle className="text-[#fca311]" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                      {displayAddress}
                    </span>
                  </div>

                  <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row w-full lg:justify-between py-5 bg-[#060e16] px-5 lg:px-8 lg:py-8 ">
                    <span className="flex text-xs font-medium  lg:font-black md:text-base ">
                      Transaction Fee
                    </span>
                    <span className="flex text-xs md:text-base items-center gap-4">
                      {data.meta?.fee / 1000000000} SOL
                    </span>
                  </div>
                </div>

                <div className="border-4 items-center flex mt-12 w-full  flex-col  text-center  divide-y divide-gray-800  bg-[#0e1c23]/60   shadow-black/70 rounded-xl shadow-2xl   border-[#12232c]">
                  {/* start */}
                  <div className="flex w-full justify-between items-center py-6 bg-[#060e16] px-8 lg:py-8 text-xs font-black  text-[#fca311]  rounded-t-xl ">
                    <span>Program Instruction Logs </span>
                    <button
                      onClick={() =>
                        setRawDataDisplay((prevState) => !prevState)
                      }
                      className="py-2 px-4 rounded-xl border border-[#12232c] bg-[#0e1c23]/60 hover:text-white hover:bg-[#0e1c23]/80 focus:outline-none focus:ring-2 focus:ring-[#12232c] focus:ring-opacity-50"
                    >
                      Raw Data
                    </button>
                  </div>
                  <div className="flex w-full items-center justify-between text-xs  lg:text-base   px-8 py-6  lg:py-8 bg-[#060e16]  ">
                    {!rawDataDisplay ? (
                      <pre className="whitespace-pre-wrap text-left">
                        {formatLogs}
                      </pre>
                    ) : (
                      <span className="whitespace-pre-wrap text-left w-[70%] break-all">
                        {typeof data.meta?.logMessages === "object"
                          ? JSON.stringify(data.meta.logMessages)
                          : data.meta?.logMessages}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          )}

          {loading ? (
            <div className="bg-[#0e1c23]/60 w-[96%] flex items-center justify-center h-72 rounded-xl gap-6 px-4 divide-x divide-white/10 py-6">
              <h1 className="text-2xl text-[#fca311] font-black animate-pulse">
                .... Loading Data{" "}
              </h1>
            </div>
          ) : error && trxError ? (
            <div className="bg-[#0e1c23]/60 w-[96%] flex items-center justify-center h-72 rounded-xl gap-6 px-4 divide-x divide-white/10 py-6">
              <h1 className="text-2xl text-[#fca311] font-black">
                Error: {error}{" "}
              </h1>
            </div>
          ) : (
            selection === "SOL Balance Change" && (
              <div className="  flex w-full flex-col  text-center  rounded-xl ">
                <div className="py-6 px-2">
                  <DataTable
                    data={balanceList}
                    columns={solBalanceColumns}
                    className="bg-[#060e16] shadow-2xl   divide-gray-800 shadow-black/70 border-4 rounded-xl border-[#12232c]"
                  />
                </div>
              </div>
            )
          )}

          {selection === "Token Balance Change" && (
            <div className="border-4 items-center flex w-full  flex-col  text-center  divide-y divide-gray-800  bg-[#0e1c23]/60   shadow-black/70 rounded-xl shadow-2xl   border-[#12232c]">
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

export default TransactionHash;
