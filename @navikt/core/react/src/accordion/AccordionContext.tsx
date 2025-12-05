import { createContext } from "react";

export type AccordionContextProps = {
  size?: "large" | "medium" | "small";
  openItems?: number[];
  mounted: boolean;
  variant?: "default" | "neutral";
};

export const AccordionContext = createContext<AccordionContextProps | null>({
  size: "medium",
  openItems: [],
  mounted: false,
});
