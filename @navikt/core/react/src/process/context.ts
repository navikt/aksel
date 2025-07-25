import { createContext } from "../util/create-context";

interface ProcessContextValue {
  onStepChange: (step: number) => void;
  lastIndex: number;
  interactive: boolean;
  activeStep: number;
  index: number;
}

export const [ProcessContextProvider, useProcessContext] =
  createContext<ProcessContextValue>({
    hookName: "useProcessContext",
    providerName: "ProcessContextProvider",
    name: "ProcessContext",
    errorMessage: "<Process.Step> has to be used within <Process>",
  });
