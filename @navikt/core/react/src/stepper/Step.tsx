import { Success, SuccessFilled } from "@navikt/ds-icons";
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
  /**
   * Manually controlls Finished-stated for Step
   */
  finished?: boolean;
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
      finished,
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

    const isFinished = finished ?? context.activeStep > index;

    return (
      <Component
        {...rest}
        disabled={disabled}
        ref={ref}
        className={cl("navds-stepper__step", className, {
          "navds-stepper__step--disabled": disabled,
          "navds-stepper__step--active": context.activeStep === index,
          "navds-stepper__step--finished": isFinished,
        })}
        onClick={(e) => {
          context.onStepChange(index);
          rest?.onClick?.(e);
        }}
      >
        {isFinished ? (
          <>
            <Success
              aria-label="finished"
              className="navds-stepper__step-number"
            />
            <SuccessFilled
              aria-label="active finished"
              className="navds-stepper__step-number navds-stepper__step-number--filled"
            />
          </>
        ) : (
          <Label className="navds-stepper__step-number">{index + 1}</Label>
        )}
        <Label spacing className="navds-stepper__step-label">
          {children}
        </Label>

        {index !== context.lastIndex - 1 && (
          <span aria-hidden className="navds-stepper__step-line" />
        )}
      </Component>
    );
  }
);

const Step = StepComponent as StepperStepType;

export default Step;
