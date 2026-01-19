import React, { forwardRef } from "react";
import { Label } from "../typography";
import { cl } from "../util/className";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { OverridableComponent } from "../util/types";
import { useStepperContext } from "./context";

export interface StepperStepProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Text content by indicator.
   */
  children: string;
  /**
   * Makes step-indicator a checkmark.
   * @default false
   */
  completed?: boolean;
  /**
   * Makes step non-interactive if false. Step will be set to a `<div>`, overriding `as`-prop.
   * @default true
   */
  interactive?: boolean;
}

export const Step: OverridableComponent<StepperStepProps, HTMLAnchorElement> =
  forwardRef(
    (
      {
        className,
        children,
        as: Component = "a",
        completed = false,
        interactive,
        onClick,
        ...rest
      },
      ref,
    ) => {
      const context = useStepperContext();

      const { activeStep } = context;

      const isInteractive = interactive ?? context?.interactive;

      const Comp = isInteractive ? Component : "div";

      const handleStepClick = () => {
        isInteractive && context.onStepChange(context.index + 1);
      };

      return (
        <Comp
          {...rest}
          aria-current={activeStep === context.index ? "step" : undefined}
          ref={ref}
          className={cl("aksel-stepper__step", className, {
            "aksel-stepper__step--active": activeStep === context.index,
            "aksel-stepper__step--behind": activeStep > context.index,
            "aksel-stepper__step--non-interactive": !isInteractive,
            "aksel-stepper__step--completed": completed,
          })}
          data-active={activeStep === context.index}
          data-completed={completed}
          data-interactive={isInteractive}
          onClick={composeEventHandlers(onClick, handleStepClick)}
        >
          {completed ? (
            <span className="aksel-stepper__circle aksel-stepper__circle--success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="none"
                viewBox="0 0 24 24"
                focusable={false}
                role="img"
                aria-hidden
              >
                <path
                  d="M10.0352 13.4148L16.4752 7.40467C17.0792 6.83965 18.029 6.86933 18.5955 7.47478C19.162 8.08027 19.1296 9.03007 18.5245 9.59621L11.0211 16.5993C10.741 16.859 10.3756 17 10.0002 17C9.60651 17 9.22717 16.8462 8.93914 16.5611L6.43914 14.0611C5.85362 13.4756 5.85362 12.5254 6.43914 11.9399C7.02467 11.3544 7.97483 11.3544 8.56036 11.9399L10.0352 13.4148Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          ) : (
            <Label
              className="aksel-stepper__circle"
              as="span"
              aria-hidden="true"
            >
              {context.index + 1}
            </Label>
          )}
          <Label as="span" className="aksel-stepper__content">
            {children}
          </Label>
        </Comp>
      );
    },
  );

export default Step;
