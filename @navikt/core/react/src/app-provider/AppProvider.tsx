import React, { createContext, useContext } from "react";

export interface AppProviderContextType {
  size: "medium" | "small";
}

export const AppProviderContext = createContext<
  AppProviderContextType | undefined
>(undefined);

export interface AppProviderProps {
  /** Inner content of the application */
  children?: React.ReactNode;
  /** Options */
  options?: { size?: "medium" | "small" };
}

export const UNSAFE_AppProvider = ({ children, options }: AppProviderProps) => {
  const ctx = useContext(AppProviderContext);

  if (ctx) {
    console.warn(
      "AppProvider should not be nested. Can lead to unknown sideeffects and bugs."
    );
  }

  return (
    <AppProviderContext.Provider value={{ size: options?.size ?? "medium" }}>
      {children}
    </AppProviderContext.Provider>
  );
};

export default UNSAFE_AppProvider;
