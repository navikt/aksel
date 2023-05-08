import { createContext } from "react";

export type AccordionContextProps = {
  variant?: "default" | "neutral";
  headingSize?: "large" | "medium" | "small" | "xsmall";
  size?: "large" | "medium" | "small";
  openItems?: number[];
};

export const AccordionContext = createContext<AccordionContextProps | null>({
  variant: "default",
  headingSize: "small",
  size: "medium",
  openItems: [],
});
