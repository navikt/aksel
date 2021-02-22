import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import StepperStep from "./Step";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  children:
    | React.ReactElement<typeof StepperStep>
    | Array<React.ReactElement<typeof StepperStep>>;
  activeStep: number;
  colorful?: boolean;
}

export const StepContext = createContext({
  colorful: false,
  activeStep: 0,
});

const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  ({ children, className, activeStep, colorful = false, ...rest }, ref) => {
    const steps = React.Children.toArray(children);
    const stepsWithIndex = steps.map(
      (step: React.ReactElement<typeof StepperStep>, index) => {
        return (
          <li>
            {React.cloneElement(step, {
              ...{ index, last: steps.length === index + 1 },
              ...step.props,
            })}
          </li>
        );
      }
    );

    return (
      <ol ref={ref} className={cl(`navds-stepper`, className)} {...rest}>
        <StepContext.Provider
          value={{
            colorful,
            activeStep,
          }}
        >
          {stepsWithIndex}
        </StepContext.Provider>
      </ol>
    );
  }
);

export default Stepper;
