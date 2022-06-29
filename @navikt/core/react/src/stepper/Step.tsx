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
   * Handled by Stepper, overwriting may break component logic
   * @private
   */
  unsafe_index?: number;
}

export interface StepperStepType
  extends OverridableComponent<StepperStepProps, HTMLAnchorElement> {}

export const StepComponent: OverridableComponent<
  StepperStepProps,
  HTMLAnchorElement
> = forwardRef(
  (
    { className, children, as: Component = "a", unsafe_index = 0, ...rest },
    ref
  ) => {
    const context = useContext(StepperContext);
    if (context === null) {
      console.error("<Stepper.Step> has to be used within <Stepper>");
      return null;
    }
    const { activeStep } = context;

    return (
      <Component
        {...rest}
        aria-current={activeStep === unsafe_index}
        ref={ref}
        className={cl("navds-stepper__step", className, {
          "navds-stepper__step--active": activeStep === unsafe_index,
        })}
        onClick={(e) => {
          context.onStepChange(unsafe_index + 1);
          rest?.onClick?.(e);
        }}
      >
        <Label className="navds-stepper__circle" as="span" aria-hidden="true">
          {unsafe_index + 1}
        </Label>
        <Label as="span" className="navds-stepper__content">
          {children}
        </Label>
      </Component>
    );
  }
);

const Step = StepComponent as StepperStepType;

export default Step;
