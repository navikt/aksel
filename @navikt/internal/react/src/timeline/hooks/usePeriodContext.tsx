import { createContext, useContext } from "react";

interface PeriodContextProps {
  id: String;
}

export const PeriodContext = createContext<PeriodContextProps>({
  id: "",
});

export const usePeriodContext = () => {
  const context = useContext(PeriodContext);

  if (!context) {
    console.warn("usePeriodContext must be used with PeriodContext");
  }

  return context;
};
