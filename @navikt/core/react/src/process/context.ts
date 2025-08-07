import { createContext } from "../util/create-context";
import { ProcessVariant } from "./ProcessVariant";

interface ProcessContextValue {
  activeStep: number;
  index: number;
  lastIndex: number;
  variant: ProcessVariant;
  hideCompletedContent: boolean;
}

export const [ProcessContextProvider, useProcessContext] =
  createContext<ProcessContextValue>({
    hookName: "useProcessContext",
    providerName: "ProcessContextProvider",
    name: "ProcessContext",
    errorMessage: "<Process.Step> has to be used within <Process>",
  });
