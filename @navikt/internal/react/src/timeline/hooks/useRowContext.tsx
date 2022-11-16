import { createContext, useContext } from "react";
import { PositionedPeriod } from "../utils/types.internal";

interface RowContextProps {
  periods: PositionedPeriod[];
  id: string;
  active: boolean;
  index: number;
}

export const RowContext = createContext<RowContextProps>({
  periods: [],
  id: "",
  active: false,
  index: 0,
});

export const useRowContext = () => {
  const context = useContext(RowContext);

  if (!context) {
    console.warn("useRowContext must be used with RowContext");
  }

  return context;
};
