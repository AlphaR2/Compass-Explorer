"use client"

import {
  PublicKey,
  ConfirmedSignatureInfo,
  ParsedTransactionWithMeta,
  Transaction,
  Connection,
  TransactionResponse,
  GetVersionedTransactionConfig,
} from "@solana/web3.js";
import { AccountLayout, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  getDomainKeySync,
  NameRegistryState,
  getAllDomains,
  reverseLookup,
} from "@bonfida/spl-name-service";
import { Metaplex } from "@metaplex-foundation/js";
import { ENV, TokenListProvider } from "@solana/spl-token-registry";

const endpoint: any = process.env.NEXT_PUBLIC_RPC;
const connection = new Connection(endpoint);

interface TransactionOptions {
  limit?: number;
  before?: string;
  until?: string;
}

interface TransactionWithSignature extends ParsedTransactionWithMeta {
  signature: string;
  fees: number;
  amount: number;
}

export const getAsset = async (address: string): Promise<any | null> => {
  if (!address) {
    return null;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAsset",
        params: {
          id: address,
          displayOptions: {
            showFungible: true,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { result } = await response.json();
    console.log("Asset:", result);
    return result;
  } catch (error) {
    console.error("Error getting token details:", error);
    return null;
  }
};

export const getTPS = async () => {
  try {
    // Fetch recent performance samples
    const performanceSamples = await connection.getRecentPerformanceSamples(1);

    if (performanceSamples.length === 0) {
      console.log("No performance samples available");
      return;
    }

    const sample = performanceSamples[0];

    // Calculate TPS (Transactions per Second)
    const tps = sample.numTransactions / sample.samplePeriodSecs;

    return tps;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

export const getTransactionTrx = async (
  address: string,
  maxSupportedTransactionVersion: number
): Promise<TransactionResponse | null> => {
  const config: GetVersionedTransactionConfig = {
    commitment: "finalized",
    maxSupportedTransactionVersion,
  };

  try {
    // console.log(address);

    const response = await connection.getTransaction(address, config);

    if (response === null) {
      console.log("Transaction not found or not finalized yet.");
      return null;
    }

    console.log("trx:", response);
    return response;
  } catch (error) {
    console.error("Error getting transaction:", error);
    return null;
  }
};

// program mapping

export const programNameMapping: { [key: string]: string } = {
  ComputeBudget111111111111111111111111111111: "Compute Budget Program",
  TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: "Token Program",
  "11111111111111111111111111111111": "System Program",
  Config1111111111111111111111111111111111111: "Config Program",
  Stake11111111111111111111111111111111111111: "Stake Program",
  Vote111111111111111111111111111111111111111: "Vote Program",
  AddressLookupTab1e1111111111111111111111111: "Address Lookup Table Program",
  BPFLoaderUpgradeab1e11111111111111111111111: "BPF Loader",
  Ed25519SigVerify111111111111111111111111111: "Ed25519 Program",
  KeccakSecp256k11111111111111111111111111111: "Secp256k1 Program",

  // AlphaR:  We can add more native programs but custom codes will be returned via their address
};

export const formatProgramLogMessages = (logMessages: string[]): string => {
  let formattedLogs = "";
  let instructionCount = 0;

  for (let i = 0; i < logMessages.length; i++) {
    const message = logMessages[i];

    if (message.includes("invoke [")) {
      instructionCount++;
      const programKey = message.split(" ")[1];
      const programName = programNameMapping[programKey] || programKey;

      formattedLogs += `#${instructionCount} ${programName} Instruction\n`;
    } else if (message.includes("success")) {
      formattedLogs += `> Program returned success\n`;
    } else if (message.includes("Program log:")) {
      const logMessage = message.split("Program log: ")[1];
      formattedLogs += `> Program logged: "${logMessage}"\n`;
    } else if (message.includes("consumed")) {
      formattedLogs += `> Program ${message.split("Program ")[1]}\n`;
    }
  }

  return formattedLogs.trim();
};

export const getTokenData = async (mint: string) => {
  try {
    const response = await fetch("https://token.jup.ag/all");

    if (!response.ok) {
      throw new Error(`Failed to fetch token data: ${response.statusText}`);
    }

    const allTokenList = await response.json();

    const matchedToken = allTokenList.find(
      (token: any) => token.address === mint
    );

    // console.log(matchedToken);

    if (matchedToken) {
      return {
        mintAddress: mint,
        address: matchedToken.address,
        name: matchedToken.name,
        symbol: matchedToken.symbol,
        image: matchedToken.logoURI,
        tags: matchedToken.tags,
      };
    } else {
      console.warn(`Token with mint address ${mint} not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
};

export const getAllAssetsForUser = async (address: string) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "searchAssets",
        params: {
          ownerAddress: address,
          tokenType: "fungible",
          displayOptions: {
            showNativeBalance: true,
          },
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { result } = await response.json();
    // console.log("Asset:", result);
    return result;
  } catch (error) {
    console.log("Error fetching Data:", error);
  }
};

export const getDomainDetails = async (input: string) => {
  const { pubkey } = await getDomainKeySync(input);
  const owner = (
    await NameRegistryState.retrieve(connection, pubkey)
  ).registry.owner.toBase58();

  return owner;
};
export const getDomainDetailsForAddress = async (
  input: string
): Promise<any> => {
  try {
    const publicKey = new PublicKey(input);
    const allDomainKeys = await getAllDomains(connection, publicKey);
    const allDomainNames = await Promise.all(
      allDomainKeys.map((key) => {
        return reverseLookup(connection, key);
      })
    );
    return allDomainNames;
  } catch (error) {
    console.error("Error fetching domain details:", error);
    throw error;
  }
};

export const getTokensMetadata = async (
  tokens: {
    tokenAccountaddress: string[] | any;
    mintAdddress: any;
    balance: number;
  }[],
  connection: Connection
) => {
  const metaplex = new Metaplex(connection);
  const provider = await new TokenListProvider().resolve();
  const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();

  const tokenMap = tokenList.reduce((map, item) => {
    map.set(item.address, item);
    return map;
  }, new Map());

  const tokensMetadata = await Promise.all(
    tokens.map(async (token) => {
      const tokenAccount = token.tokenAccountaddress;
      const mint = token.mintAdddress;
      const mintPublickey = new PublicKey(mint);
      const amount = token.balance;
      let name = "";
      let logoURI = "";
      try {
        const token = await metaplex
          .nfts()
          .findByMint({ mintAddress: mintPublickey });
        name = token.name;
        if (name == "") {
          const _name = token.json?.name;
          if (_name != undefined && _name != "") {
            name = _name;
          } else {
            name = "Unknown token";
          }
        }
        const _logoURI = token.json?.image;
        if (_logoURI != undefined && _logoURI != "") {
          logoURI = _logoURI;
        } else {
          const _token = tokenMap.get(mint);
          if (!_token || !_token.logoURI) {
            logoURI =
              "https://arweave.net/WCMNR4N-4zKmkVcxcO2WImlr2XBAlSWOOKBRHLOWXNA";
          } else {
            logoURI = _token.logoURI;
          }
        }
      } catch (error) {
        const token = tokenMap.get(mint);
        if (!token || !token.logoURI) {
          logoURI =
            "https://arweave.net/WCMNR4N-4zKmkVcxcO2WImlr2XBAlSWOOKBRHLOWXNA";
        } else {
          logoURI = token.logoURI;
        }
        if (!token || !token.name) {
          name = "Unknown token";
        } else {
          name = token.name;
        }
      }
      // possibly add price side here...
      return { name, logoURI, tokenAccount, mint, amount };
    })
  );
  tokensMetadata.sort(function (a, b) {
    if (a.name.toUpperCase() < b.name.toUpperCase()) {
      return -1;
    }
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    }
    return 0;
  });

  return tokensMetadata;
};

export const getTokenAccountsByOwner = async (
  connection: Connection,
  publicKey: PublicKey
) => {
  const { value: splAccounts } = await connection.getTokenAccountsByOwner(
    publicKey,
    {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    },
    "processed"
  );
  return splAccounts;
};

export const processTokenAccounts = (splAccounts: any) => {
  return splAccounts.map((m: any) => {
    const data = m.account.data;
    const info = AccountLayout.decode(data);
    const mintAdddress = new PublicKey(info.mint).toBase58();
    const tokenAccountaddress = m.pubkey.toBase58();
    return {
      tokenAccountaddress,
      mintAdddress,
      delegateOption: info.delegateOption,
    };
  });
};

export const fetchTokenBalances = async (
  connection: Connection,
  tokenAccounts: any[]
) => {
  const balances = await Promise.all(
    tokenAccounts.map(async (account) => {
      const balance = await connection.getTokenAccountBalance(
        new PublicKey(account.tokenAccountaddress)
      );

      const uiAmount = balance.value.uiAmountString;
      // console.log("Balance:", uiAmount);
      return { ...account, balance: uiAmount };
    })
  );
  return balances;
};

export const getUserTokenDelegated = async (inputPub: string) => {
  const publicKey = new PublicKey(inputPub);

  try {
    const splAccounts = await getTokenAccountsByOwner(connection, publicKey);

    const tokenAccounts = processTokenAccounts(splAccounts);
    const tokenDelegated = tokenAccounts.filter(
      (m: any) => m.delegateOption != 0
    );

    const tokenDelegatedMetadata = await getTokensMetadata(
      tokenDelegated,
      connection
    );

    return tokenDelegatedMetadata;
  } catch (error) {
    console.error("Error fetching delegated tokens:", error);
  }
};


export const getTransactionsOfUser = async (
  address: string,
  options: TransactionOptions,
  connection: Connection,
  maxSupportedTransactionVersion: number
): Promise<TransactionWithSignature[]> => {
  // console.log({ address, options });

  try {
    const config: GetVersionedTransactionConfig = {
      commitment: "finalized",
      maxSupportedTransactionVersion,
    };
    const publicKey = new PublicKey(address);
    const transSignatures: ConfirmedSignatureInfo[] =
      await connection.getSignaturesForAddress(publicKey, options);
    // console.log({ transSignatures });

    const transactions = await Promise.all(
      transSignatures.map(async (signatureInfo) => {
        const signature = signatureInfo.signature;
        const confirmedTransaction = await connection.getTransaction(
          signature,
          config
        );

        if (confirmedTransaction && confirmedTransaction.meta) {
          const { meta } = confirmedTransaction;
          const oldBalance = meta.preBalances[0];
          const newBalance = meta.postBalances[0];
          const amount = oldBalance - newBalance;
          const transWithSignature: any = {
            signature,
            ...confirmedTransaction,
            fees: meta.fee,
            amount,
          };
          return transWithSignature;
        }
      })
    );
    // console.log(transactions);
    return transactions;
  } catch (err: any) {
    console.error("Error fetching transactions:", err);
    throw new Error(
      `Failed to fetch transactions for address ${address}: ${err.message}`
    );
  }
};
