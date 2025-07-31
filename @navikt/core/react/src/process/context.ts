import { createContext } from "../util/create-context";
import { ProcessProps } from "./Process";

interface ProcessContextValue {
  variant: ProcessProps["variant"];
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
