import { createContext } from "react";

interface StepperContextProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  lastIndex: number;
  orientation: "horizontal" | "vertical";
  interactive: boolean;
}

export const StepperContext = createContext<StepperContextProps | null>(null);
