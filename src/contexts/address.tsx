"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AddressContextType {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string>("");

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
