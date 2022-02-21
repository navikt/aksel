import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { StepperContext } from ".";
import { Label, OverridableComponent } from "..";

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
    {
      className,
      children,
      as: Component = "button",
      disabled,
      index = 0,
      ...rest
    },
    ref
  ) => {
    const context = useContext(StepperContext);

    if (context === null) {
      console.error(
        "<StepIndicator.Step> has to be used within an <StepIndicator>"
      );
      return null;
    }

    return (
      <Component
        {...rest}
        disabled={disabled}
        ref={ref}
        className={cl("navds-stepper__step", className, {
          "navds-stepper__step--disabled": disabled,
          "navds-stepper__step--active": context.activeStep === index,
        })}
        onClick={(e) => {
          context.onStepChange(index);
          rest?.onClick?.(e);
        }}
      >
        <Label className="navds-stepper__step-number">
          {context.activeStep === index ? ` ${index + 1}` : index + 1}
        </Label>
        <Label className="navds-stepper__step-label">{children}</Label>
      </Component>
    );
  }
);

const Step = StepComponent as StepperStepType;

export default Step;
