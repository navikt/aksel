"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AccordionContextProps = {
  openToggle: (index: number) => void;
  currentOpen: number[];
};

const AccordionContext = createContext<AccordionContextProps | null>(null);

function WebsiteAccordionProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options: number;
}) {
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
        setOpenAccordions(Array.from({ length: options }, (_, i) => i));
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [options]);

  const handleOpenChange = useCallback((index: number) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }, []);

  const contextValue = useMemo(
    () => ({ openToggle: handleOpenChange, currentOpen: openAccordions }),
    [handleOpenChange, openAccordions],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      {children}
    </AccordionContext.Provider>
  );
}

function useWebsiteAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "useWebsiteAccordion must be used within an WebsiteAccordionProvider",
    );
  }
  return context;
}

export { WebsiteAccordionProvider, useWebsiteAccordion };
