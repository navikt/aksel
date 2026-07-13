import { createContext } from "react";

interface AccordionItemContextProps {
  open: boolean;
  toggleOpen: () => void;
}

const AccordionItemContext = createContext<AccordionItemContextProps | null>(
  null,
);

export { AccordionItemContext };
