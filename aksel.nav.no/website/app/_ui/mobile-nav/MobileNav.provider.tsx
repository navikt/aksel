"use client";

import { createContext, useContext, useState } from "react";

type MobileNavContextT = {
  open: boolean;
  toggleOpen: (toState?: boolean) => void;
};

const MobileNavContext = createContext<MobileNavContextT | null>(null);

function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <MobileNavContext.Provider
      value={{
        open,
        toggleOpen: (toState) => {
          setOpen((prevState) => toState ?? !prevState);
        },
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}

function useMobileNav() {
  const context = useContext(MobileNavContext);

  if (!context) {
    throw new Error("useMobileNav needs to be used within MobileNavProvider");
  }

  return context;
}

export { MobileNavProvider, useMobileNav };
