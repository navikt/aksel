import { createContext, useContext } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";

interface PeriodContextProps {
  periodId: string;
  restProps?: any;
}

export const PeriodContext = createContext<PeriodContextProps>({
  periodId: "",
});

export const usePeriodContext = () => {
  const context = useContext(PeriodContext);

  if (!context) {
    consoleWarning(
      "<Timeline />: usePeriodContext must be used with PeriodContext",
    );
  }

  return context;
};
