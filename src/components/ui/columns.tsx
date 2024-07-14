"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ShortenAddress, NormalAddress } from "@/utils/accountUtils";

export type Transactions = {
  signature: string | any;
  time: string;
  signer: any;
  by: string | any;
  fee: number;
};

export type TokenType = {
  name: string;
  tokenAddress: string | any;
  balance: number;
  price: number;
  value: number;
};

export type SolBalanceType = {
  addy: string;
  BalanceBefore: number | any;
  BalanceAfter: number | any;
  BalanceChange: number | any;
};

export const trxColumns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "signature",
    header: "Signature",
    cell: ({ row }) => (
      <ShortenAddress
        addressType="signature"
        address={row.original.signature}
      />
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "signer",
    header: "Signer",
    cell: ({ row }) => <NormalAddress address={row.original.signer} />,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "fee",
    header: "Fee",
  },
];

export const tokensColumns: ColumnDef<TokenType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "tokenAddress",

    header: "token Address",
    cell: ({ row }) => (
      <ShortenAddress
        addressType="tokenaddress"
        address={row.original.tokenAddress}
      />
    ),
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "totalPrice",
    header: "Value",
  },
  {
    accessorKey: "pricePerToken",
    header: "Price",
  },
];

export const solBalanceColumns: ColumnDef<SolBalanceType>[] = [
  {
    accessorKey: "addy",
    header: "Address",
    cell: ({ row }) => <NormalAddress address={row.original.addy} />,
  },

  {
    accessorKey: "before",
    header: " Before(SOL)",
  },

  {
    accessorKey: "after",
    header: " After(SOL)",
  },

  {
    accessorKey: "change",
    header: " Change(SOL)",
  },
];
