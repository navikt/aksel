import { createContext } from "react";

export type ExpansionCardContextProps = {
  open: boolean;
  toggleOpen: () => void;
  size: "medium" | "small";
};

export const ExpansionCardContext = createContext<ExpansionCardContextProps>({
  open: false,
  toggleOpen: () => {},
  size: "medium",
});
