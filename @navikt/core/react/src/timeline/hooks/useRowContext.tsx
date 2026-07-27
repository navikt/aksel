import { createContext, useContext } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import type { PositionedPeriod } from "../utils/types.internal";

interface RowContextProps {
  periods: PositionedPeriod[];
  id: string;
  index: number;
}

export const RowContext = createContext<RowContextProps>({
  periods: [],
  id: "",
  index: 0,
});

export const useRowContext = () => {
  const context = useContext(RowContext);

  if (!context) {
    consoleWarning("<Timeline />: useRowContext must be used with RowContext");
  }

  return context;
};
