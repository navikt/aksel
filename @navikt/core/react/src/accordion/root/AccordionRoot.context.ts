import { createContext } from "react";

type AccordionContextProps = {
  size?: "large" | "medium" | "small";
  openItems?: number[];
  mounted: boolean;
  variant?: "default" | "neutral";
};

const AccordionContext = createContext<AccordionContextProps | null>({
  size: "medium",
  openItems: [],
  mounted: false,
});

export { AccordionContext };
