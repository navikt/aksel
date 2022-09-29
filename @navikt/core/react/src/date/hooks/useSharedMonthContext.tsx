import { createContext, useContext } from "react";

export type SharedMonthContextType = {
  isValidDropdownCaption: boolean;
  selectedMonth: Date;
  onSelect: (date: Date) => void;
};

export const SharedMonthContext = createContext<SharedMonthContextType>({
  isValidDropdownCaption: false,
  selectedMonth: new Date(),
  onSelect: () => {},
});

export const useSharedMonthContext = () => useContext(SharedMonthContext);
