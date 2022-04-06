import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { StepperContext } from "./Stepper";
import { Label, OverridableComponent } from "..";

export interface StepperStepProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Text content under indicator
   */
  children: string;
  /**
   * Handled by Stepper
   */
  index?: number;
}

export interface StepperStepType
  extends OverridableComponent<StepperStepProps, HTMLAnchorElement> {}

export const StepComponent: OverridableComponent<
  StepperStepProps,
  HTMLAnchorElement
> = forwardRef(
  ({ className, children, as: Component = "a", index = 0, ...rest }, ref) => {
    const context = useContext(StepperContext);
    if (context === null) {
      console.error(
        "<StepIndicator.Step> has to be used within an <StepIndicator>"
      );
      return null;
    }
    const activeStep = context.activeStep === index;

    return (
      <Component
        {...rest}
        aria-current={Boolean(activeStep)}
        ref={ref}
        className={cl("navds-stepper__step", className, {
          "navds-stepper__step--active": activeStep,
        })}
        onClick={(e) => {
          context.onStepChange(index);
          rest?.onClick?.(e);
        }}
      >
        <Label className="navds-stepper__step-number" as="span">
          {activeStep ? `${index + 1}` : index + 1}
        </Label>
        <Label className="navds-stepper__step-label">{children}</Label>
      </Component>
    );
  }
);

const Step = StepComponent as StepperStepType;

export default Step;
