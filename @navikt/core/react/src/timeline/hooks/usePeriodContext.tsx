import { createContext, useContext } from "react";

interface PeriodContextProps {
  periodId: string;
  firstFocus: boolean;
  restProps?: any;
}

export const PeriodContext = createContext<PeriodContextProps>({
  periodId: "",
  firstFocus: false,
});

export const usePeriodContext = () => {
  const context = useContext(PeriodContext);

  if (!context) {
    console.warn("usePeriodContext must be used with PeriodContext");
  }

  return context;
};
