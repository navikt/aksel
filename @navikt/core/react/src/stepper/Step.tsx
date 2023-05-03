import { CheckmarkIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { Label, OverridableComponent } from "..";
import { StepperContext } from "./Stepper";

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
  /**
   * Makes step-indicator a checkmark
   * @default false
   */
  completed?: boolean;
  /**
   * Makes step non-interactive if false. Step will be set to a <div>, overriding `as`-prop
   * @default true
   */
  interactive?: boolean;
}

export interface StepperStepType
  extends OverridableComponent<StepperStepProps, HTMLAnchorElement> {}

export const StepComponent: OverridableComponent<
  StepperStepProps,
  HTMLAnchorElement
> = forwardRef(
  (
    {
      className,
      children,
      as: Component = "a",
      unsafe_index = 0,
      completed = false,
      interactive,
      ...rest
    },
    ref
  ) => {
    const context = useContext(StepperContext);
    if (context === null) {
      console.error("<Stepper.Step> has to be used within <Stepper>");
      return null;
    }
    const { activeStep } = context;

    const isInteractive = interactive ?? context?.interactive;

    const Comp = isInteractive ? Component : "div";

    return (
      <Comp
        {...rest}
        aria-current={activeStep === unsafe_index}
        ref={ref}
        className={cl("navds-stepper__step", className, {
          "navds-stepper__step--active": activeStep === unsafe_index,
          "navds-stepper__step--behind": activeStep > unsafe_index,
          "navds-stepper__step--non-interactive": !isInteractive,
          "navds-stepper__step--completed": completed,
        })}
        onClick={(e) => {
          isInteractive && context.onStepChange(unsafe_index + 1);
          rest?.onClick?.(e);
        }}
      >
        {completed ? (
          <span className="navds-stepper__circle navds-stepper__circle--success">
            <CheckmarkIcon aria-hidden />
          </span>
        ) : (
          <Label className="navds-stepper__circle" as="span" aria-hidden="true">
            {unsafe_index + 1}
          </Label>
        )}
        <Label as="span" className="navds-stepper__content">
          {children}
        </Label>
      </Comp>
    );
  }
);

const Step = StepComponent as StepperStepType;

export default Step;
