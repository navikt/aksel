"use client";

import { createContext, useContext, useState } from "react";
import { Dialog } from "@navikt/ds-react";

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
      <Dialog open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        {children}
      </Dialog>
    </MobileNavContext.Provider>
  );
}

function useMobileNav() {
  const context = useContext(MobileNavContext);

  return context;
}

export { MobileNavProvider, useMobileNav };
