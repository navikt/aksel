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

const CompletedIcon = () => (
  <svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable={false}
    role="img"
    aria-hidden
    aria-label="Fullført"
  >
    <path
      d="M4.93563 6.41478L11.3755 0.404669C11.9796 -0.160351 12.9294 -0.130672 13.4959 0.47478C14.0624 1.08027 14.0299 2.03007 13.4249 2.59621L5.92151 9.59934C5.64138 9.85904 5.27598 10 4.90064 10C4.5069 10 4.12756 9.84621 3.83953 9.56111L1.33953 7.06111C0.75401 6.47558 0.75401 5.52542 1.33953 4.93989C1.92506 4.35437 2.87522 4.35437 3.46075 4.93989L4.93563 6.41478Z"
      fill="currentColor"
    />
  </svg>
);

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
            <CompletedIcon />
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
