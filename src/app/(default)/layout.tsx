"use client";

import { AddressProvider } from "@/contexts/address";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AddressProvider>{children}</AddressProvider>
    </main>
  );
}
