import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { StepContext } from ".";
import { OverridableComponent } from "..";

export interface StepIndicatorStepProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  /**
   * Handled by StepIndicator
   */
  index?: number;
}

export interface StepIndicatorStepType
  extends OverridableComponent<StepIndicatorStepProps, HTMLButtonElement> {}

const StepComponent: OverridableComponent<
  StepIndicatorStepProps,
  HTMLButtonElement
> = forwardRef(
  (
    { className, children, as: Component = "button", disabled, index, ...rest },
    ref
  ) => {
    const context = useContext(StepContext);

    if (context === null) {
      console.error(
        "<StepIndicator.Step> has to be used within an <StepIndicator>"
      );
      return null;
    }

    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-step-indicator__step", className, {
          "navds-step-indicator__step--disabled": disabled,
          "navds-step-indicator__step--active": context.activeStep === index,
        })}
        onClick={(e) => {
          context.onStepChange(index ?? 0);
          rest.onClick && rest.onClick(e);
        }}
      >
        <div className={cl("navds-step-indicator__step-label")}>{children}</div>
      </Component>
    );
  }
);

const Step = StepComponent as StepIndicatorStepType;

export default Step;
