import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { StepperContext } from "./Stepper";
import { Label, OverridableComponent } from "..";

export interface StepperStepProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Text content by indicator
   */
  children: string;
  /**
   * Handled by Stepper
   * @private
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
      console.error("<Stepper.Step> has to be used within <Stepper>");
      return null;
    }
    const { orientation, activeStep } = context;
    const horizontalClass = orientation === "horizontal" ? "horizontal" : "";

    return (
      <Component
        {...rest}
        aria-current={Boolean(activeStep === index)}
        ref={ref}
        className={cl("navds-stepper__step", horizontalClass, className, {
          "navds-stepper__step--active": activeStep === index,
        })}
        onClick={(e) => {
          context.onStepChange(index + 1);
          rest?.onClick?.(e);
        }}
      >
        <span className={cl(`navds-stepper__step-line`, horizontalClass)} />
        <Label
          className={cl("navds-stepper__step-number", horizontalClass)}
          as="span"
        >
          {index + 1}
        </Label>
        <Label className={cl("navds-stepper__step-label", horizontalClass)}>
          {children}
        </Label>
      </Component>
    );
  }
);

const Step = StepComponent as StepperStepType;

export default Step;
