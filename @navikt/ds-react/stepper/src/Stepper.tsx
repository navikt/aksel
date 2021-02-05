import React, {
  createContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import cl from "classnames";
import Step, { StepProps } from "./Step";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  activeStep?: number;
}

interface StepperComponent
  extends React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<HTMLDivElement>
  > {
  Step: React.ForwardRefExoticComponent<
    StepProps & React.RefAttributes<HTMLDivElement>
  >;
}

export const OrientationContext = createContext("horizontal");

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ children, className, orientation = "horizontal", ...rest }, ref) => {
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
        <OrientationContext.Provider value={orientation}>
          {children}
        </OrientationContext.Provider>
      </div>
    );
  }
) as StepperComponent;

Stepper.Step = Step;

export default Stepper;
