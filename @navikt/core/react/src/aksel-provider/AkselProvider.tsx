import React, { createContext, useContext } from "react";

export interface AkselProviderContextType {
  size: "medium" | "small";
}

export const AkselProviderContext = createContext<
  AkselProviderContextType | undefined
>(undefined);

export interface AkselProviderProps {
  /** Inner content of the application */
  children?: React.ReactNode;
  /** Options */
  options?: { size?: "medium" | "small" };
}

export const UNSAFE_AkselProvider = ({
  children,
  options,
}: AkselProviderProps) => {
  const ctx = useContext(AkselProviderContext);

  if (ctx) {
    console.warn(
      "AkselProvider should not be nested. Can lead to unknown sideeffects and bugs."
    );
  }

  return (
    <AkselProviderContext.Provider value={{ size: options?.size ?? "medium" }}>
      {children}
    </AkselProviderContext.Provider>
  );
};

export default UNSAFE_AkselProvider;
