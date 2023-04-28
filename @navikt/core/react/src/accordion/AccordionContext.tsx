import { createContext } from "react";

export type AccordionContextProps = {
  variant?: "default" | "neutral";
  headingsize?: "large" | "medium" | "small" | "xsmall";
  size?: "large" | "medium" | "small";
  openitems?: number[];
};

export const AccordionContext = createContext<AccordionContextProps | null>({
  variant: "default",
  headingsize: "small",
  size: "medium",
  openitems: [],
});
