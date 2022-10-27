import React, { createContext, useContext } from "react";

export interface AkselProviderContextType {}

export const AkselProviderContext = createContext<
  AkselProviderContextType | undefined
>(undefined);

export interface AkselProviderProps {
  /** Inner content of the application */
  children?: React.ReactNode;
  /** Options */
  options?: {};
}

export const AkselProvider = ({ children, options }: AkselProviderProps) => {
  const ctx = useContext(AkselProviderContext);

  if (ctx) {
    console.warn("AkselProvider should not be nested.");
  }

  return (
    <AkselProviderContext.Provider value={{}}>
      {children}
    </AkselProviderContext.Provider>
  );
};

export default AkselProvider;
