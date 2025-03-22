"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AccordionContextProps = {
  openToggle: (index: number) => void;
  currentOpen: number[];
};

const AccordionContext = createContext<AccordionContextProps | null>(null);

function AccordionProvider({
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
        setOpenAccordions(new Array(options).fill(0).map((_, i) => i));
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [options]);

  const handleOpenChange = (index: number) => {
    if (openAccordions.includes(index)) {
      setOpenAccordions(openAccordions.filter((i) => i !== index));
    } else {
      setOpenAccordions([...openAccordions, index]);
    }
  };

  return (
    <AccordionContext.Provider
      value={{ openToggle: handleOpenChange, currentOpen: openAccordions }}
    >
      {children}
    </AccordionContext.Provider>
  );
}

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
}

export { AccordionProvider, useAccordion };
