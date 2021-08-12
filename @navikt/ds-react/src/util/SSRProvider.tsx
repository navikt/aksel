import React, { createContext } from "react";

interface SSRProviderProps {
  children: React.ReactNode;
}

interface SSRContextValue {
  idCounter: number;
}

export const SSRContext = createContext<SSRContextValue | null>(null);

export const SSRProvider = ({
  children,
}: SSRProviderProps): React.ReactElement => {
  return (
    <SSRContext.Provider value={{ idCounter: 0 }}>
      {children}
    </SSRContext.Provider>
  );
};
