import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import Step, { StepIndicatorStepType, StepIndicatorStepProps } from "./Step";

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
  className?: string;
  activeStep: number;
  onStepChange: (step: number) => void;
}

interface StepIndicatorComponent
  extends React.ForwardRefExoticComponent<
    StepIndicatorProps & React.RefAttributes<HTMLOListElement>
  > {
  Step: StepIndicatorStepType;
}

interface StepContextProps {
  activeStep: number;
  onStepChange: (step: number) => void;
}

export const StepContext = createContext<StepContextProps | null>(null);

const StepIndicator: StepIndicatorComponent = forwardRef<
  HTMLOListElement,
  StepIndicatorProps
>(({ children, className, activeStep, onStepChange, ...rest }, ref) => {
  const stepsWithIndex = React.Children.map(children, (step, index) => {
    return React.isValidElement<StepIndicatorStepProps>(step) ? (
      <li
        className="navds-step-indicator__step-li"
        key={index}
        aria-current={index === activeStep && "step"}
      >
        {React.cloneElement(step, {
          ...step.props,
          ...{ index },
        })}
      </li>
    ) : (
      step
    );
  });

  return (
    <ol ref={ref} className={cl(`navds-step-indicator`, className)} {...rest}>
      <StepContext.Provider value={{ activeStep, onStepChange }}>
        {stepsWithIndex}
      </StepContext.Provider>
    </ol>
  );
}) as StepIndicatorComponent;

StepIndicator.Step = Step;

export default StepIndicator;
