"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useMedia } from "@/ui-utils/hooks/useMedia";

type IconPageContextT = {
  activeIconButton: HTMLButtonElement | null;
  setActiveIconButton: (button: HTMLButtonElement | null) => void;
  hideDialog: boolean;
};

const IconPageContext = createContext<IconPageContextT | null>(null);

function IconPageProvider({ children }: { children?: React.ReactNode }) {
  const [activeIconButton, setActiveIconButton] =
    useState<HTMLButtonElement | null>(null);

  const hideDialog = useMedia("screen and (min-width: 1280px)");

  const contextValue = useMemo(
    () => ({ activeIconButton, setActiveIconButton, hideDialog }),
    [activeIconButton, hideDialog],
  );

  return (
    <IconPageContext.Provider value={contextValue}>
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
