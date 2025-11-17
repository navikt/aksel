import { createContext } from "react";

export type AccordionContextProps = {
  size?: "large" | "medium" | "small";
  openItems?: number[];
  mounted: boolean;
};

export const AccordionContext = createContext<AccordionContextProps | null>({
  size: "medium",
  openItems: [],
  mounted: false,
});
