"use client";

import { createContext, useContext, useState } from "react";

type MobileNavContextT = {
  open: boolean;
  toggleOpen: (toState?: boolean) => void;
};

const MobileNavContext = createContext<MobileNavContextT>({
  open: false,
  toggleOpen: () => null,
});

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

  return context;
}

export { MobileNavProvider, useMobileNav };
