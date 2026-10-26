import { createContext } from "react";

type ExpansionCardContextProps = {
  open: boolean;
  toggleOpen: () => void;
  size: "medium" | "small";
};

const ExpansionCardContext = createContext<ExpansionCardContextProps>({
  open: false,
  toggleOpen: () => {},
  size: "medium",
});

export { ExpansionCardContext };
export type { ExpansionCardContextProps };
