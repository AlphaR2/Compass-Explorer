// "use client";

// import React, { useState } from "react";

// import { TbArrowsTransferDown } from "react-icons/tb";
// import { useScreenWidth } from "@/utils/accountUtils";
// import ExplorerHeader from "@/components/ui/explorer-header";
// import Tooltip from "@/components/reusables/tooltip";
// import { FaWallet, FaCopy, FaCheckCircle } from "react-icons/fa";
// import { trxColumns, tokensColumns } from "@/components/ui/columns";
// import { DataTable, NftDataTable } from "@/components/reusables/data-table";
// import { useAddress } from "@/contexts/address";

// import {
//   tokensList,
//   NftList,
//   unknownList,
//   trxList,
// } from "@/utils/accountUtils";

// const TransactionHash = () => {
//   const [copied, setCopied] = useState<boolean>(false);
//   const [selection, setSelection] = useState<string>("History");

//   const [result, setResult] = useState<string | any>("");

//   // useEffect(() => {
//   //   setResult(address);
//   // }, []);

//   const shortenAddress = (address: string): string => {
//     if (!address) return "";

//     const length = address.length;
//     const prefix = address.slice(0, 27);
//     const suffix = address.slice(length - 4, length);

//     return `${prefix}....${suffix}`;
//   };

//   const screenWidth = useScreenWidth();

//   const trxInput =
//     "  3u5NEfB7viUht6UriwbGGVYiqHXTnJFsQKW3geN2dHxGTNEPZSqkWup5Cp8drsYfWiZTYkxuSYEG4MGQtLMxstDf";

//   const displayTrx = screenWidth > 900 ? trxInput : shortenAddress(trxInput);

//   const addressInput = "  Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o";

//   const displayAddress =
//     screenWidth > 2000 ? addressInput : shortenAddress(addressInput);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(addressInput).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const toggleSelection = (select: any) => {
//     setSelection(select);
//   };

//   const SELECTIONS = ["History", "Tokens", "NFTs", "DEFI"];

//   return (
//     <main>
//       <ExplorerHeader />
//       <div className="flex flex-col gap-16 mt-12">
//         <section className="flex flex-col lg:flex-row pb-6 px-2 py-6 lg:px-9  border-b border-white/20  ">
//           <div className="flex flex-col gap-8 lg:gap-8 w-full px-12">
//             <div className="flex items-center gap-4 divide-x-2 divide-white/20">
//               <span>
//                 <TbArrowsTransferDown
//                   className="text-3xl text-[#fca311]
                
//                 lg:text-4xl"
//                 />
//               </span>
//               <h1 className="text-xl lg:text-3xl font-bold pl-4">CatWifHat</h1>
//             </div>

//             <div className="flex flex-col   w-full  gap-6 ">
//               <h2 className="flex gap-4 text-xs  lg:text-base items-center font-semibold tracking-widest  text-ellipsis">
//                 {displayTrx}
//               </h2>
//             </div>
//           </div>
//         </section>

//         <section className="flex flex-col md:grid md:grid-cols-3 gap-5 lg:gap-8 mx-16 lg:mx-20 mb-32">
//           <div className="border-4  flex gap-9  py-4 px-4  w-full  flex-col    bg-[#0e1c23]/60   shadow-black/70 rounded-xl shadow-2xl   border-[#12232c]">
//             <h1 className="text-xs font-bold flex border-b-2 pb-4 border-gray-800">
//               OVERVIEW
//             </h1>
//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 CURRENT PRICE
//               </span>
//               <span className="text-sm lg:text-base font-bold">$0.0003445</span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 DECIMALS
//               </span>
//               <span className="text-sm lg:text-base font-bold">2</span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 TOKEN STANDARD
//               </span>
//               <span className="text-sm lg:text-base font-bold">FUNGIBLE</span>
//             </div>
//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 TOKEN EXTENSION
//               </span>
//               <span className="text-sm lg:text-base font-bold">true</span>
//             </div>
//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 HOLDERS
//               </span>
//               <span className="text-sm lg:text-base font-bold">200,000</span>
//             </div>
//           </div>

//           {/* 2 */}

//           <div className="border-4  flex gap-9  py-4 px-4  w-full  flex-col    bg-[#0e1c23]/60   shadow-black/70 rounded-xl shadow-2xl   border-[#12232c]">
//             <h1 className="text-xs font-bold flex border-b-2 pb-4 border-gray-800">
//               INFO
//             </h1>
//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 MINTABLE
//               </span>
//               <span className="text-sm lg:text-base font-bold">NO</span>
//             </div>
//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 MUTABLE
//               </span>
//               <span className="text-sm lg:text-base font-bold">NO</span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 OWNERSHIP RENOUNCED
//               </span>
//               <span className="text-sm lg:text-base font-bold">YES</span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 BURNT
//               </span>
//               <span className="text-sm lg:text-base font-bold">NO</span>
//             </div>

//             {/* <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 CREATOR ADDRESS
//               </span>
//               <span className="text-sm lg:text-base font-bold">
//                 {displayAddress}
//               </span>
//             </div> */}

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 UPDATE AUTHORITY
//               </span>
//               <span className="text-sm lg:text-base font-bold">
//                 {displayAddress}
//               </span>
//             </div>
//           </div>

//           {/* 3 */}
//           <div className="border-4  flex gap-9  py-4 px-4  w-full  flex-col    bg-[#0e1c23]/60   shadow-black/70 rounded-xl shadow-2xl   border-[#12232c]">
//             <h1 className="text-xs font-bold flex border-b-2 pb-4 border-gray-800">
//               FUNDAMENTALS
//             </h1>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 CIRCULATING SUPPLY
//               </span>
//               <span className="text-sm lg:text-base font-bold">
//                 34,713,972,642,861.28
//               </span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 MARKET CAP
//               </span>
//               <span className="text-sm lg:text-base font-bold">$24m</span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 TOTAL SUPPLY
//               </span>
//               <span className="text-sm lg:text-base font-bold">
//                 9,999,979,532.49
//               </span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 Fully Diluted Market Cap
//               </span>
//               <span className="text-sm lg:text-base font-bold">
//                 {displayAddress}
//               </span>
//             </div>

//             <div className="flex flex-col gap-3">
//               <span className="text-xs font-semibold text-[#fca311]/70 ">
//                 SOCIALS
//               </span>
//               <span className="text-sm lg:text-base font-bold">true</span>
//             </div>
//           </div>
//         </section>

//         <section className="">
//           <div className="flex gap-8  lg:gap-7 mb-20 px-2  pb-12 border-b border-white/20">
//             {SELECTIONS.map((select, i) => (
//               <button
//                 key={i}
//                 onClick={() => toggleSelection(select)}
//                 className={`rounded-2xl w-52 border-b shadow-inner lg:w-44 font-bold text-[10px] sm:text-[13px] md:text-sm text-center   lg:p-1 p-2  ${
//                   selection.includes(select)
//                     ? " border-[#fca311]"
//                     : " border-white"
//                 }`}
//               >
//                 {select}
//               </button>
//             ))}
//           </div>
//           {selection === "History" && (
//             <div className=" bg-[#081420]  sm:p-6 rounded-tl-3xl rounded-br-3xl  shadow-2xl  border-[#34d4f7]/60">
//               <DataTable
//                 className="border-[#12232c]  bg-[#0e1c23]/60"
//                 columns={trxColumns}
//                 data={trxList}
//               />
//             </div>
//           )}

//           {selection === "Tokens" && (
//             <div className=" bg-[#081420]  sm:p-6 rounded-tl-3xl rounded-br-3xl  shadow-2xl  border-[#34d4f7]/60">
//               <DataTable
//                 className="border-[#12232c]  bg-[#0e1c23]/60"
//                 columns={tokensColumns}
//                 data={tokensList}
//               />
//             </div>
//           )}

//           {selection === "NFTs" && (
//             <div className=" bg-[#081420]  sm:p-6 rounded-tl-3xl rounded-br-3xl  shadow-2xl  border-[#34d4f7]/60">
//               {<NftDataTable data={NftList} />}
//             </div>
//           )}

//           {selection === "DEFI" && (
//             <div className=" bg-[#081420] sm:p-6 rounded-tl-3xl rounded-br-3xl  shadow-2xl  border-[#34d4f7]/60">
//               <DataTable
//                 className="border-[#12232c]  bg-[#0e1c23]/60"
//                 columns={tokensColumns}
//                 data={unknownList}
//               />
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default TransactionHash;
