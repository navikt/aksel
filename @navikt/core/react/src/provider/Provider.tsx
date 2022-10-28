import React, { createContext } from "react";

export interface AkselProviderContextType {}

export const AkselProviderContext = createContext<
  AkselProviderContextType | undefined
>(undefined);

export interface AkselProviderProps {
  children?: React.ReactNode;
  /** Options */
  options?: {};
}

export const AkselProvider = ({ children, options }: AkselProviderProps) => {
  return (
    <AkselProviderContext.Provider value={{}}>
      {children}
    </AkselProviderContext.Provider>
  );
};

export default AkselProvider;
