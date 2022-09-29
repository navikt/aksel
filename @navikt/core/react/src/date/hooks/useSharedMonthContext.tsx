import { createContext, useContext } from "react";

export type SharedMonthContextType = {
  isValidDropdownCaption: boolean;
};

export const SharedMonthContext = createContext<SharedMonthContextType>({
  isValidDropdownCaption: false,
});

export const useMonthSelectorContext = () => useContext(SharedMonthContext);
