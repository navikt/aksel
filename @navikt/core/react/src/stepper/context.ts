import { createContext } from "../util/create-context";

interface StepperContextValue {
  onStepChange: (step: number) => void;
  lastIndex: number;
  orientation: "horizontal" | "vertical";
  interactive: boolean;
  activeStep: number;
  index: number;
}

export const [StepperContextProvider, useStepperContext] =
  createContext<StepperContextValue>({
    hookName: "useStepperContext",
    providerName: "StepperContextProvider",
    name: "StepperContext",
    errorMessage: "<Stepper.Step> has to be used within <Stepper>",
  });
