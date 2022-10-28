import React, { createContext, useContext } from "react";

export interface ProviderContextType {
  rootElement?: HTMLElement;
  appElement?: HTMLElement;
}

export const ProviderContext = createContext<ProviderContextType | undefined>(
  undefined
);

export interface ProviderProps {
  children?: React.ReactNode;
  rootElement?: HTMLElement;
  appElement?: HTMLElement;
}

export const useProvider = () => useContext(ProviderContext);

export const Provider = ({ children, ...rest }: ProviderProps) => {
  return (
    <ProviderContext.Provider value={rest}>{children}</ProviderContext.Provider>
  );
};

export default Provider;
