import { createContext, useContext } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";

interface PeriodContextProps {
  periodId: string;
  restProps?: any;
}

const PeriodContext = createContext<PeriodContextProps>({
  periodId: "",
});

const usePeriodContext = () => {
  const context = useContext(PeriodContext);

  if (!context) {
    consoleWarning(
      "<Timeline />: usePeriodContext must be used with PeriodContext",
    );
  }

  return context;
};

export { PeriodContext, usePeriodContext };
