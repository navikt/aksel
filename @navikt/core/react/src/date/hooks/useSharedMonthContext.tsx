import { createContext, useContext } from "react";
import { Matcher } from "../utils";

export type SharedMonthContextType = {
  isValidDropdownCaption: boolean;
  selectedMonth: Date;
  onSelect: (date: Date) => void;
  yearState: Date;
  setYearState: (date: Date) => void;
  disabled: Matcher[];
};

export const SharedMonthContext = createContext<SharedMonthContextType>({
  isValidDropdownCaption: false,
  selectedMonth: new Date(),
  onSelect: () => {},
  yearState: new Date(),
  setYearState: () => {},
  disabled: [],
});

export const useSharedMonthContext = () => useContext(SharedMonthContext);
