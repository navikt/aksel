import React, { forwardRef } from "react";
import cl from "classnames";
import Step, { StepperStepProps, StepperStepType } from "./Step";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  children: React.ReactNode;
  /**
   * Adds classname to wrapper
   */
  className?: string;
}

interface StepperComponent
  extends React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<HTMLOListElement>
  > {
  Step: StepperStepType;
}

const Stepper: StepperComponent = forwardRef<HTMLOListElement, StepperProps>(
  ({ children, className, ...rest }, ref) => {
    const stepsWithIndex = React.Children.map(children, (step, index) => {
      return React.isValidElement<StepperStepProps>(step) ? (
        <li className={cl("navds-stepper__step-wrapper")} key={index}>
          {React.cloneElement(step, {
            ...step.props,
          })}
        </li>
      ) : (
        step
      );
    });

    return (
      <ol {...rest} ref={ref} className={cl("navds-stepper", className)}>
        {stepsWithIndex}
      </ol>
    );
  }
) as StepperComponent;

Stepper.Step = Step;

export default Stepper;
