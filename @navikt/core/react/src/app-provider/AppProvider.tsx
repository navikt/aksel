import React, { createContext } from "react";

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

export const AppProvider = ({ children, options }: AppProviderProps) => {
  return (
    <AppProviderContext.Provider value={{ size: options?.size ?? "medium" }}>
      {children}
    </AppProviderContext.Provider>
  );
};

export default AppProvider;
