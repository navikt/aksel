import { createContext } from "../util/create-context";
import { ProcessVariant } from "./ProcessVariant";

interface ProcessContextValue {
  variant: ProcessVariant;
  activeStep: number;
  lastIndex: number;
  index: number;
}

export const [ProcessContextProvider, useProcessContext] =
  createContext<ProcessContextValue>({
    hookName: "useProcessContext",
    providerName: "ProcessContextProvider",
    name: "ProcessContext",
    errorMessage: "<Process.Step> has to be used within <Process>",
  });
