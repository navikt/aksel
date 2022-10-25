import { createContext, useContext } from "react";
import { PositionedPeriod } from "../utils/types.internal";

interface RowContextProps {
  periods: PositionedPeriod[];
}

export const RowContext = createContext<RowContextProps>({
  periods: [],
});

export const useRowContext = () => {
  const context = useContext(RowContext);

  if (!context) {
    console.warn("useRowContext must be used with RowContext");
  }

  return context;
};
