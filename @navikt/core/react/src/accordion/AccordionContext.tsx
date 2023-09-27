import { createContext } from "react";

export type AccordionContextProps = {
  variant?: "default" | "neutral";
  headingSize?: "large" | "medium" | "small" | "xsmall";
  size?: "large" | "medium" | "small";
  openItems?: number[];
  mounted: boolean;
};

export const AccordionContext = createContext<AccordionContextProps | null>({
  headingSize: "small",
  size: "medium",
  openItems: [],
  mounted: false,
});
