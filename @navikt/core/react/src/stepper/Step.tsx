import cl from "classnames";
import React, { forwardRef } from "react";
import { OverridableComponent } from "..";

export interface StepperStepProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Text content under indicator
   */
  children: React.ReactNode;
  /**
   * Disables interaction with element
   */
  disabled?: boolean;
  /**
   * Handled by Stepper
   */
  index?: number;
}

export interface StepperStepType
  extends OverridableComponent<StepperStepProps, HTMLButtonElement> {}

const StepComponent: OverridableComponent<
  StepperStepProps,
  HTMLButtonElement
> = forwardRef(
  (
    { className, children, as: Component = "button", disabled, index, ...rest },
    ref
  ) => {
    return (
      <Component
        {...rest}
        disabled={disabled}
        ref={ref}
        className={cl("navds-stepper__step", className)}
      >
        {children}
      </Component>
    );
  }
);

const Step = StepComponent as StepperStepType;

export default Step;
