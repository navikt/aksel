import React, { forwardRef } from "react";
import cl from "classnames";

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
  > {}

const Stepper: StepperComponent = forwardRef<HTMLOListElement, StepperProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <ol {...rest} ref={ref} className={cl("navds-stepper", className)}>
        My stepper
      </ol>
    );
  }
) as StepperComponent;

export default Stepper;
