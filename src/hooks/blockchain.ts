"use client";
import { FC, useState, useEffect, useCallback } from "react";
import { PublicKey, Transaction, Connection } from "@solana/web3.js";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  getAsset,
  getTPS,
  getAllAssetsForUser,
  getDomainDetailsForAddress,
  getUserTokenDelegated,
  getTransactionsOfUser,
} from "@/utils/blockchain";
import { programNameMapping } from "@/utils/blockchain";

const endpoint: any = process.env.NEXT_PUBLIC_RPC;



const connection = new Connection(endpoint);



//   const tokenResponse = async (): Promise<AssetData> => {
//     if (!address) return null;

//     try {
//       const firstData = await getAsset(address);
//       const price = Math.floor(firstData.token_info.price_info.price_per_token);

//       const secondData = await getSupply();
//       const circSupply = secondData.value.circulating;

//       const nearestValue = Math.round(circSupply / 1_000_000_000);
//       const marketCap = Math.floor(nearestValue * price);

//       return { price, marketCap };
//     } catch (error) {
//       console.error("ERROR GETTING DETAILS:", error);
//       return null;
//     }
//   };

//   return { tokenResponse };
// };

export const useAssetData = (address: string) => {
  const [price, setPrice] = useState<number | any>(null);
  const [blockHeight, setBlockHeight] = useState<number | any>(null);
  const [epoch, setEpoch] = useState<number | any>(null);
  const [trxCount, setTrxCount] = useState<number | any>(null);
  const [CurrentTps, setCurrentTps] = useState<number | any>(null);
  const [marketCap, setMarketCap] = useState<number | any>(null);
  const [trendingData, setTrendingData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | any>(null);

  const connection = new Connection(endpoint);

  const fetchAssetData = async (): Promise<void> => {
    if (!address) {
      setLoading(false);
      return;
    }

    try {
      // Fetch supply data

      const supplyData = await connection.getSupply({
        excludeNonCirculatingAccountsList: true,
      });

      // console.log(supplyData);
      const circulatingSupply: any = supplyData.value.circulating;

      // fetch epochInfo
      const epochInfoData = await connection.getEpochInfo();
      // fetch tps

      const transPerSeconds: any = await getTPS();
      const tps = Math.floor(transPerSeconds.toFixed(2));
      setCurrentTps(tps);

      // console.log(`Current TPS: ${transPerSeconds.toFixed(2)}`);

      // get associated data
      const epoch = epochInfoData.epoch;
      const blockHeightData: any = epochInfoData.blockHeight;
      const trxCount = epochInfoData.transactionCount;
      setEpoch(epoch);
      setTrxCount(trxCount?.toLocaleString());
      setBlockHeight(blockHeightData.toLocaleString());

      // Fetch asset data
      const assetData = await getAsset(address);
      if (!assetData) {
        setError("Failed to fetch asset data.");
      }
      const tokenPrice = Math.floor(
        assetData.token_info.price_info.price_per_token
      );
      setPrice(tokenPrice);

      // Calculate nearest value and market cap
      const nearestValue = Math.round(circulatingSupply / 1_000_000_000);
      const calculatedMarketCap = Math.floor(
        nearestValue * tokenPrice
      ).toLocaleString();
      setMarketCap(calculatedMarketCap);
    } catch (err) {
      console.error("ERROR GETTING DETAILS:", err);
      setError("Failed to fetch asset data.");
    } finally {
      setLoading(false);
    }
  };

  // const fetchTrending = async (): Promise<void> => {
  //   const trending = await getTrendingTokens();

  //   console.log("TRENDING:", trending);
  //   setTrendingData(trending);
  // };

  useEffect(() => {
    fetchAssetData();

    // set up interval
    const interval = setInterval(fetchAssetData, 300000);

    return () => clearInterval(interval);
  }, []);

  // const solData = {
  //   price,
  //   blockHeight,
  //   epoch,
  //   trxCount,
  //   CurrentTps,
  //   marketCap,
  // };

  return {
    price,
    blockHeight,
    epoch,
    trxCount,
    CurrentTps,
    marketCap,
    trendingData,
    loading,
    error,
  };
};

export const useSolBalance = (data: any) => {
  const [allAddress, setAllAddress] = useState<string[]>([]);
  const [preBalances, setPreBalances] = useState<number[]>([]);
  const [postBalances, setPostBalances] = useState<number[]>([]);
  const [balanceList, setBalanceList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | any>(null);

  const getAllAddress = async () => {
    try {
      const publicKeysArray = await data.transaction?.message?.accountKeys;

      if (Array.isArray(publicKeysArray)) {
        const addressList: any[] | any = publicKeysArray.map((pubKey) => {
          let publicKeyString = pubKey?.[Symbol?.toStringTag];
          if (
            publicKeyString.startsWith("PublicKey(") &&
            publicKeyString.endsWith(")")
          ) {
            publicKeyString = publicKeyString.slice(10, -1);
          }

          return publicKeyString;
        });

        const addressNames = await Promise.all(
          addressList.map(async (address: any) => {
            const nativeCheck = programNameMapping[address];

            return nativeCheck || address;
          })
        );

        setAllAddress(addressNames);

        // console.log(allAddress);
        // console.log(addressNames);
      }

      const preBalancesArray = data.meta?.preBalances || [];
      const postBalancesArray = data.meta?.postBalances || [];

      setPreBalances(preBalancesArray);
      setPostBalances(postBalancesArray);

      const balanceList = allAddress.map((addy, index) => ({
        addy,
        before: (preBalances[index] || 0) / 1000000000,
        after: (postBalances[index] || 0) / 1000000000,
        change:
          (postBalances[index] || 0) / 1000000000 -
          (preBalances[index] || 0) / 1000000000,
      }));

      setBalanceList(balanceList);

      // console.log(balanceList);
    } catch (error) {
      console.error("Error Fetching Data:", error);
      setError("No SOL Balance Change Detected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAddress();
  }, [data]);

  return {
    error,
    loading,
    balanceList,
    allAddress,
    preBalances,
    postBalances,
  };
};

export const useUserDetails = (address: string) => {
  const [allAssets, setAllAssets] = useState<any>([]);
  const [nativeBalance, setNativeBalance] = useState<number>(0);
  const [accountValue, setAccountValue] = useState<number | any>(0);
  const [tokenList, setTokenList] = useState<any>([]);
  const [nftList, setNftList] = useState<any>([]);
  const [userDetails, setUserDetails] = useState<any>("");
  const [domain, setDomain] = useState<any>("None");
  const [delegated, setTokenDelegated] = useState<any>("");
  const [balanceList, setBalanceList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | any>(null);

  const getAllAssets = async () => {
    try {
      const results: any = await getAllAssetsForUser(address);
      const assetsList = results.items;

      // console.log(results.items);
      // console.log(results.nativeBalance);
      // console.log(results);

      // native balance
      const nativeBalance = (await results.nativeBalance?.total_price) ?? 0;
      setNativeBalance(Math.round(nativeBalance));
      // Initialize variables
      let totalPrice = 0;

      // Check if results.items is an array
      if (Array.isArray(results.items)) {
        // Loop through each item
        for (const item of results.items) {
          // Calculate total price
          const itemPrice = item.token_info?.price_info?.total_price ?? 0;
          totalPrice += itemPrice;
        }
      }

      const grouped = assetsList.reduce(
        (acc: { [key: string]: any }, item: any) => {
          const { interface: interfaceType } = item;
          if (!acc[interfaceType]) {
            // console.log(interfaceType);
            acc[interfaceType] = [];
          }
          acc[interfaceType].push(item);
          return acc;
        },
        {}
      );

      // console.log(grouped);

      const fungibleTokens = grouped["FungibleToken"] || [];
      const fungibleAssets = grouped["FungibleAsset"] || [];

      //  fungible Token Data array

      // Extract metadata values
      const metadataValues = fungibleTokens.map((item: any) => ({
        name: item.content?.metadata?.name,
        imageUrl: item.content?.links.image,
      }));

      // Extract token addresses
      const tokenAddresses = fungibleTokens.map((item: any) => ({
        id: item.id,
      }));

      // Extract token details
      const tokenDetails = fungibleTokens.map((item: any) => ({
        pricePerToken: item.token_info?.price_info?.price_per_token,
        totalPrice: item.token_info?.price_info?.total_price,
      }));

      // Combine extracted values into a list
      const fungibleTokensList = fungibleTokens.map(
        (item: any, index: number) => ({
          name: metadataValues[index].name,
          imageUrl: metadataValues[index].imageUrl,
          tokenAddress: tokenAddresses[index].id,
          pricePerToken: tokenDetails[index].pricePerToken,
          totalPrice: tokenDetails[index].totalPrice,
          balance:
            tokenDetails[index].totalPrice / tokenDetails[index].pricePerToken,
        })
      );

      setTokenList(fungibleTokensList);

      // fungibleAssets data table

      // Extract name and image from metadata of each FungibleAsset
      const assetDetails = fungibleAssets.map((asset: any) => ({
        name: asset.content?.metadata?.name,
        imageUrl: asset.content?.links.image,
      }));

      setNftList(assetDetails);

      const domains = await getDomainDetailsForAddress(address);
      setDomain(domains || "None");

      const delegated = await getUserTokenDelegated(address);
      setTokenDelegated(delegated);

      const options = { limit: 10 };

      // const getStake = await getStakeAccount(address);
      // setUserDetails(getStake);

      const getTrx = await getTransactionsOfUser(
        address,
        options,
        connection,
        2
      );

      // console.log(getTrx);

      const transactions = await Promise.all(
        getTrx.map(async (sigInfo: any) => {
          const signature = sigInfo.signature;

          if (sigInfo && sigInfo.meta) {
            const { meta, blockTime, transaction } = sigInfo;

            const ageInDays = blockTime
              ? Math.floor((Date.now() / 1000 - blockTime) / (60 * 60 * 24))
              : 0;

            const timeUTC = blockTime
              ? new Date(blockTime * 1000).toUTCString()
              : "N/A";
            const status = meta.err === null ? "Success" : "Failure";

            const message = await sigInfo.transaction?.message;

            // Check if message and accountKeys are defined
            if (
              !message ||
              (!message.accountKeys && !message.staticAccountKeys)
            ) {
              console.log("Transaction message or account keys not found");
              return;
            }

            // Access the first PublicKey in the accountKeys array
            const publicKey =
              message.accountKeys?.[0] || message.staticAccountKeys?.[0];

            // Ensure publicKey is defined and has the expected structure
            if (!publicKey) {
              console.log("PublicKey not found");
              return;
            }

            // Assuming publicKey is an object with a _bn property
            let addressInput = publicKey
              ? publicKey?.[Symbol?.toStringTag]
              : `Public Key not found`;

            if (
              addressInput.startsWith("PublicKey(") &&
              addressInput.endsWith(")")
            ) {
              addressInput = addressInput.slice(10, -1);
            }

            return {
              signature,
              age: `${ageInDays} days ago`,
              time: timeUTC,
              signer: addressInput,
              fee: meta.fee / 1000000000,
              status,
            };
          }
        })
      );

      setUserDetails(transactions);
      setAllAssets(results.items ?? []);
      setAccountValue(Math.round(totalPrice).toLocaleString());
    } catch (error) {
      console.error("Error Fetching Data:", error);
      setError("No Asset Detected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAssets();
  }, []);

  return {
    error,
    loading,
    balanceList,
    userDetails,
    allAssets,
    delegated,
    tokenList,
    nftList,
    domain,
    nativeBalance,
    accountValue,
  };
};

// export const useGetTransactions = (address: string) => {
//   const [trxList, setTrxList] = useState<any[]>([]);
//   const [trxLoading, setTrxLoading] = useState<boolean>(true);
//   const [trxError, setTrxError] = useState<string | null>(null);
//   const [limit, setLimit] = useState<number>(10);

//   const trxVersion = 1;

//   const getTransactions = async (
//     address: any,
//     maxSupportedTransactionVersion: number,
//     options: any,
//     connection: Connection
//   ): Promise<void> => {
//     setTrxLoading(true);
//     setTrxError(null);

//     try {
//       const publicKey: any = new PublicKey(address);
//       const getTrx = await getTransactionsOfUser(
//         publicKey,
//         options,
//         connection,
//         maxSupportedTransactionVersion
//       );

//       const transactions = await Promise.all(
//         getTrx.map(async (sigInfo) => {
//           const signature = sigInfo.signature;

//           if (sigInfo && sigInfo.meta) {
//             const { meta, blockTime, transaction } = sigInfo;

//             const ageInDays = blockTime
//               ? Math.floor((Date.now() / 1000 - blockTime) / (60 * 60 * 24))
//               : 0;

//             const timeUTC = blockTime
//               ? new Date(blockTime * 1000).toUTCString()
//               : "N/A";

//             const byPublicKey =
//               transaction.message.accountKeys[0]?.toString() ?? "N/A";
//             const status = meta.err === null ? "Success" : "Failure";

//             return {
//               signature,
//               age: `${ageInDays} days ago`,
//               time: timeUTC,
//               signer: byPublicKey,
//               fee: meta.fee,
//               status,
//             };
//           }

//           return null;
//         })
//       );

//       setTrxList(transactions.filter(Boolean));
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setTrxError("No TRX Detected for this address");
//     } finally {
//       setTrxLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTransactions(address, trxVersion, { limit }, connection);
//   }, [address, limit]);

//   return {
//     limit,
//     setLimit,
//     trxList,
//     trxError,
//     trxLoading,
//   };
// };
