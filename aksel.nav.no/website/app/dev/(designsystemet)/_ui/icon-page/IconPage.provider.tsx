"use client";

import { createContext, useContext, useState } from "react";

type IconPageContextT = {
  activeIconButton: HTMLButtonElement | null;
  setActiveIconButton: (button: HTMLButtonElement | null) => void;
};

const IconPageContext = createContext<IconPageContextT | null>(null);

function IconPageProvider({ children }: { children?: React.ReactNode }) {
  const [activeIconButton, setActiveIconButton] =
    useState<HTMLButtonElement | null>(null);

  return (
    <IconPageContext.Provider
      value={{
        activeIconButton,
        setActiveIconButton,
      }}
    >
      {children}
    </IconPageContext.Provider>
  );
}

function useIconPage() {
  const context = useContext(IconPageContext);

  if (context === null) {
    throw new Error("useIconPage must be used within an IconPageProvider");
  }
  return context;
}

export { IconPageProvider, useIconPage };
