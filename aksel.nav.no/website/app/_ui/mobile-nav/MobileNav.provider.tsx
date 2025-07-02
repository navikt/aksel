"use client";

import {
  MutableRefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type MobileNavContextT = {
  open: boolean;
  toggleOpen: (toState?: boolean) => void;
  focusRef: MutableRefObject<HTMLButtonElement | null>;
};

const MobileNavContext = createContext<MobileNavContextT>({
  open: false,
  toggleOpen: () => null,
  focusRef: { current: null },
});

function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const focusRef = useRef<HTMLButtonElement | null>(null);

  return (
    <MobileNavContext.Provider
      value={{
        open,
        toggleOpen: (toState) => {
          setOpen((prevState) => toState ?? !prevState);
        },
        focusRef,
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
