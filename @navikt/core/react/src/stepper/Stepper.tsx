import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import Step, { StepperStepProps, StepperStepType } from "./Step";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * <Stepper.Step /> elements
   */
  children: React.ReactNode;
  /**
   * Adds classname to wrapper
   */
  className?: string;
  /**
   * Current active step index
   */
  activeStep: number;
  /**
   * Callback for clicked step index
   */
  onStepChange?: (step: number) => void;
}

interface StepperComponent
  extends React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<HTMLOListElement>
  > {
  Step: StepperStepType;
}

interface StepperContextProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  lastIndex: number;
}

export const StepperContext = createContext<StepperContextProps | null>(null);

const Stepper: StepperComponent = forwardRef<HTMLOListElement, StepperProps>(
  (
    { children, className, activeStep, onStepChange = () => {}, ...rest },
    ref
  ) => {
    const stepsWithIndex = React.Children.map(children, (step, index) => {
      return React.isValidElement<StepperStepProps>(step) ? (
        <li className={cl("navds-stepper__step-wrapper")} key={index}>
          {React.cloneElement(step, {
            ...step.props,
            index,
          })}
        </li>
      ) : (
        step
      );
    });

    return (
      <ol {...rest} ref={ref} className={cl("navds-stepper", className)}>
        <StepperContext.Provider
          value={{
            activeStep,
            onStepChange,
            lastIndex: React.Children.count(children),
          }}
        >
          {stepsWithIndex}
        </StepperContext.Provider>
      </ol>
    );
  }
) as StepperComponent;

Stepper.Step = Step;

export default Stepper;
