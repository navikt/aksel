import { createContext } from "react";

export type AccordionContextProps = {
  variant?: "default" | "neutral";
  headingsize?: "large" | "medium" | "small" | "xsmall";
};

export const AccordionContext = createContext<AccordionContextProps | null>({
  variant: "default",
  headingsize: "small",
});
