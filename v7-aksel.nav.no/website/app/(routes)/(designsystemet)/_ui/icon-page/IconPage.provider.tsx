"use client";

import { createContext, useContext, useState } from "react";
import { useMedia } from "@/hooks/useMedia";

type IconPageContextT = {
  activeIconButton: HTMLButtonElement | null;
  setActiveIconButton: (button: HTMLButtonElement | null) => void;
  hideModal: boolean;
};

const IconPageContext = createContext<IconPageContextT | null>(null);

function IconPageProvider({ children }: { children?: React.ReactNode }) {
  const [activeIconButton, setActiveIconButton] =
    useState<HTMLButtonElement | null>(null);

  const hideModal = useMedia("screen and (min-width: 1280px)");

  return (
    <IconPageContext.Provider
      value={{
        activeIconButton,
        setActiveIconButton,
        hideModal,
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
