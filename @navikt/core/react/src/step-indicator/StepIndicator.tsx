import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import Step, { StepIndicatorStepType, StepIndicatorStepProps } from "./Step";

export interface StepIndicatorProps
  extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
  className?: string;
  activeStep: number;
  onStepChange: (step: number) => void;
  hideLabels?: boolean;
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
  /**
   * Hides labels for each step if true
   * @default false
   */
  hideLabels: boolean;
}

export const StepContext = createContext<StepContextProps | null>(null);

/* TODO: Legge til autoresponsive prop fra gammel versjon */
const StepIndicator: StepIndicatorComponent = forwardRef<
  HTMLOListElement,
  StepIndicatorProps
>(
  (
    {
      children,
      className,
      activeStep,
      hideLabels = false,
      onStepChange,
      ...rest
    },
    ref
  ) => {
    const stepsWithIndex = React.Children.map(children, (step, index) => {
      return React.isValidElement<StepIndicatorStepProps>(step) ? (
        <li
          className="navds-step-indicator__step-wrapper"
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
        <StepContext.Provider value={{ activeStep, onStepChange, hideLabels }}>
          {stepsWithIndex}
        </StepContext.Provider>
      </ol>
    );
  }
) as StepIndicatorComponent;

StepIndicator.Step = Step;

export default StepIndicator;
