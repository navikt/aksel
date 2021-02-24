import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import StepperStep from "./Step";
import "@navikt/ds-css/stepper/index.css";
import { uuid } from "../../util/src";
import { afterMain } from "@popperjs/core";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  children:
    | React.ReactElement<typeof StepperStep>
    | Array<React.ReactElement<typeof StepperStep>>;
  activeStep: number;
  colorful?: boolean;
  arrow?: boolean;
}

export const StepContext = createContext({
  activeStep: 0,
});

const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  (
    {
      children,
      className,
      activeStep,
      colorful = false,
      arrow = false,
      ...rest
    },
    ref
  ) => {
    const steps = React.Children.toArray(children);
    const stepsWithIndex = steps.map(
      (step: React.ReactElement<typeof StepperStep>, index) => {
        return (
          <li key={uuid()} aria-current={index === activeStep && "step"}>
            {React.cloneElement(step, {
              ...step.props,
              ...{ index, last: steps.length === index + 1 },
            })}
          </li>
        );
      }
    );

    return (
      <ol
        ref={ref}
        className={cl(`navds-stepper`, className, {
          "navds-stepper--arrow": arrow,
          "navds-stepper--colorful": colorful,
        })}
        {...rest}
      >
        <StepContext.Provider
          value={{
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
