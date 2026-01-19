import { createStrictContext } from "../utils/helpers";

interface StepperContextValue {
  onStepChange: (step: number) => void;
  lastIndex: number;
  orientation: "horizontal" | "vertical";
  interactive: boolean;
  activeStep: number;
  index: number;
}

export const {
  Provider: StepperContextProvider,
  useContext: useStepperContext,
} = createStrictContext<StepperContextValue>({
  name: "StepperContext",
  errorMessage: "<Stepper.Step> has to be used within <Stepper>",
});
