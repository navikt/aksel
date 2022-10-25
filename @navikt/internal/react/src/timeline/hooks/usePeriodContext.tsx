import { createContext, useContext } from "react";

interface PeriodContextProps {
  periodId: String;
}

export const PeriodContext = createContext<PeriodContextProps>({
  periodId: "",
});

export const usePeriodContext = () => {
  const context = useContext(PeriodContext);

  if (!context) {
    console.warn("usePeriodContext must be used with PeriodContext");
  }

  return context;
};
