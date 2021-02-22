import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import StepperStep from "./Step";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  children:
    | React.ReactElement<typeof StepperStep>
    | Array<React.ReactElement<typeof StepperStep>>;
  activeStep: number;
  onClick?: (event) => void;
  colorful?: boolean;
}

export const StepContext = createContext({
  interactive: false,
  colorful: false,
  activeStep: 0,
});

/*
 * TODO: Kode steps i <ol><li>
 */
const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  (
    { children, className, activeStep, onClick, colorful = false, ...rest },
    ref
  ) => {
    const steps = React.Children.toArray(children);
    const stepsWithIndex = steps.map(
      (step: React.ReactElement<typeof StepperStep>, index) => {
        return React.cloneElement(step, {
          ...{ index, last: steps.length === index + 1 },
          ...step.props,
        });
      }
    );

    const context = () => {
      return {
        interactive: onClick ? true : false,
        colorful,
        activeStep,
      };
    };

    return (
      <ol
        ref={ref}
        className={cl(`navds-stepper`, "navds-stepper--vertical", className)}
        {...rest}
      >
        <StepContext.Provider value={context()}>
          {/*  {stepsWithIndex} */}

          {stepsWithIndex.map(
            (element: React.ReactElement<typeof StepperStep>) => {
              return <li>{element}</li>;
            }
          )}
        </StepContext.Provider>
      </ol>
    );
  }
);

export default Stepper;
