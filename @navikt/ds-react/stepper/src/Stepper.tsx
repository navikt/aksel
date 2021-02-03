import React, { forwardRef, useEffect, useRef, useState } from "react";
import cl from "classnames";
import Step, { StepProps } from "./Step";
import "@navikt/ds-css/stepper/index.css";

export interface StepperProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface StepperComponent
  extends React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<HTMLDivElement>
  > {
  Step: React.ForwardRefExoticComponent<
    StepProps & React.RefAttributes<HTMLDivElement>
  >;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ children, className, ...rest }, ref) => {
    return <div>{children}</div>;
  }
) as StepperComponent;

Stepper.Step = Step;

export default Stepper;
