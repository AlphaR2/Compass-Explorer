"use client";

import { useState, useEffect } from "react";
import { FaCheckCircle, FaCopy } from "react-icons/fa";

export type AccountData = {
  name?: string;
  logoURI?: string;
  tokenAccount?: any;
  mint: string[] | any;
  amount: number;
};

type TokenData = {
  name: string;
  tokenaddress: string | any;
  balance: number;
  price: number;
  value: number;
};

type NftData = {
  name: string;
  image: any;
};

type TrxData = {
  signature: string | any;
  time: string;
  instruction: string;
  by: string | any;
  fee: number;
};
interface ShortenAddressProps {
  address: string;
  addressType: "tokenaddress" | "by" | "signature";
}

export const ShortenAddress: React.FC<ShortenAddressProps> = ({
  address,
  addressType,
}: {
  address: string | any;
  addressType: string | any;
}) => {
  const [copied, setCopied] = useState<Boolean>(false);

  if (!address) return "";

  const length = address.length;
  const prefix = address.slice(0, 25);
  const suffix = address.slice(length - 25, length);

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const getLink = () => {
    switch (addressType) {
      case "tokenaddress":
      case "by":
        return `https://compass-explorer.vercel.app/address/${address}`;
      case "signature":
        return `https://compass-explorer.vercel.app/trx/${address}`;
      default:
        return "#";
    }
  };

  return (
    <div className="flex items-center">
      <a
        href={getLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-700 "
      >
        {`${prefix}....${suffix}`}
      </a>

      <button title="click" onClick={handleCopy} style={{ marginLeft: "8px" }}>
        {copied ? <FaCheckCircle className="text-green-600" /> : <FaCopy />}
      </button>
    </div>
  );
};

export const NormalAddress = ({ address }: { address: string | any }) => {
  const [copied, setCopied] = useState<Boolean>(false);

  if (!address) return "";

  const length = address.length;
  const prefix = address.slice(0, 24);
  const suffix = address.slice(length - 6, length);

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center">
      <a target="_blank" rel="noopener noreferrer" className="">
        {`${prefix}....${suffix}`}
      </a>

      <button title="click" onClick={handleCopy} style={{ marginLeft: "8px" }}>
        {copied ? <FaCheckCircle className="text-green-600" /> : <FaCopy />}
      </button>
    </div>
  );
};

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState<number | any>(null);

  useEffect(() => {
    // Only execute on the client side
    if (typeof window !== "undefined") {
      const handleResize = () => setScreenWidth(window.innerWidth);

      setScreenWidth(window.innerWidth); // Set initial width
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return screenWidth;
};

export const trxList: TrxData[] = [
  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: "Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: "Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: "Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: " Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: " Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: " Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: " Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: " Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: " Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },

  {
    signature:
      "4ZRjJ4aQbYnTDBxwd9rvfHtSWsVtFqtwQKfRAGS4HkZirwtPcfQS8sbZ1UvHe8x9kj23QLQcmSztJTBNmSmwFcDN",
    time: "20 days ago",
    instruction: "setComputeUnitPrice",
    by: " Fhe6eV2KAUccfZ39QuSD9eBYV5fUxMzHg2HSEe5Q4R7o",
    fee: 0.002,
  },
];

export const NftList: NftData[] | any = [
  {
    name: "MadLads #2233",
    image: "/images/FORTIFYL.png",
  },

  {
    name: "DE GODS",
    image: "/images/FORTIFYL.png",
  },

  {
    name: "Kamino Cards",
    image: "/images/FORTIFYL.png",
  },

  {
    name: "Wormhole Pass",
    image: "/images/FORTIFYL.png",
  },

  {
    name: "Dogs on Solana",
    image: "/images/FORTIFYL.png",
  },

  {
    name: "Renegade Cats",
    image: "/images/FORTIFYL.png",
  },
  {
    name: "Renegade Cats",
    image: "/images/FORTIFYL.png",
  },
  {
    name: "Renegade Cats",
    image: "/images/FORTIFYL.png",
  },
  {
    name: "Renegade Cats",
    image: "/images/FORTIFYL.png",
  },
  {
    name: "Renegade Cats",
    image: "/images/FORTIFYL.png",
  },
  {
    name: "Renegade Cats",
    image: "/images/FORTIFYL.png",
  },
  {
    name: "Renegade Cats",
    image: "/images/FORTIFYL.png",
  },
];

export const tokensList: TokenData[] = [
  {
    name: "Jupiter Token",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 3000,
    price: 0.8,
    value: 2400,
  },

  {
    name: "USD Coin",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 6000,
    price: 1,
    value: 6000,
  },

  {
    name: "Kamino",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 30000,
    price: 0.033,
    value: 2400,
  },

  {
    name: "Wormhole Token",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 3000,
    price: 0.62,
    value: 1860,
  },

  {
    name: "Dogwifhat",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 1000,
    price: 2,
    value: 2000,
  },

  {
    name: "io.net",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 300,
    price: 2.39,
    value: 717,
  },

  {
    name: "Orca",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 500,
    price: 1.67,
    value: 835,
  },

  {
    name: "Pyth Network",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 3600,
    price: 0.2,
    value: 720,
  },

  {
    name: "Bonk",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 30000000,
    price: 0.00002,
    value: 600,
  },

  {
    name: "Jito",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 3000,
    price: 2,
    value: 6000,
  },
];

export const unknownList: TokenData[] = [
  {
    name: "USD Coin",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 6000,
    price: 1,
    value: 6000,
  },

  {
    name: "Kamino",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 30000,
    price: 0.033,
    value: 2400,
  },

  {
    name: "Dogwifhat",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 1000,
    price: 2,
    value: 0,
  },

  {
    name: "io.net",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 0,
    price: 0,
    value: 0,
  },

  {
    name: "Bonk",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 3,
    price: 0,
    value: 0,
  },

  {
    name: "Jito",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 3000,
    price: 0,
    value: 0,
  },
  {
    name: "USD Coin",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 6000,
    price: 1,
    value: 6000,
  },
  {
    name: "USD Coin",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 6000,
    price: 1,
    value: 6000,
  },
  {
    name: "USD Coin",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 6000,
    price: 1,
    value: 6000,
  },
  {
    name: "USD Coin",
    tokenaddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    balance: 6000,
    price: 1,
    value: 6000,
  },
];
