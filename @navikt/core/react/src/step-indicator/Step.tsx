import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { StepContext } from ".";
import { BodyShort, Label, OverridableComponent } from "..";

export interface StepIndicatorStepProps
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

    const safeIndex = index ?? 0;

    const Number = context.activeStep === safeIndex ? Label : BodyShort;

    return (
      <Component
        {...rest}
        disabled={disabled}
        ref={ref}
        className={cl("navds-step-indicator__step", className, {
          "navds-step-indicator__step--disabled": disabled,
          "navds-step-indicator__step--active":
            context.activeStep === safeIndex,
          "navds-step-indicator__step--finished":
            context.activeStep > safeIndex,
        })}
        onClick={(e) => {
          context.onStepChange(safeIndex);
          rest.onClick && rest.onClick(e);
        }}
      >
        <Number className="navds-step-indicator__step-number">
          {safeIndex + 1}
        </Number>
        <div
          className={cl("navds-step-indicator__step-label", {
            "navds-sr-only": context.hideLabels,
          })}
        >
          {children}
        </div>
        {safeIndex !== 0 && (
          <span aria-hidden className="navds-step-indicator__step-line" />
        )}
      </Component>
    );
  }
);

const Step = StepComponent as StepIndicatorStepType;

export default Step;
