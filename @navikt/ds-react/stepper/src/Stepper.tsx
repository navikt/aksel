import React, {
  createContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import cl from "classnames";
import StepperStep from "./Step";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children:
    | React.ReactElement<typeof StepperStep>
    | Array<React.ReactElement<typeof StepperStep>>;
  orientation?: "horizontal" | "vertical";
  activeStep?: number;
}

export const StepContext = createContext({
  orientation: "horizontal",
  activeStep: 0,
});

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      children,
      className,
      orientation = "horizontal",
      activeStep = 0,
      ...rest
    },
    ref
  ) => {
    const stepsWithIndex = React.Children.toArray(children).map(
      (step: React.ReactElement<typeof StepperStep>, index) => {
        return React.cloneElement(step, {
          ...{ index },
          ...step.props,
        });
      }
    );
    const context = { orientation: "horizontal", activeStep };

    return (
      <div
        ref={ref}
        className={cl(
          "navds-stepper",
          `navds-stepper--${orientation}`,
          className
        )}
        {...rest}
      >
        <StepContext.Provider value={context}>
          {stepsWithIndex}
        </StepContext.Provider>
      </div>
    );
  }
);

export default Stepper;
