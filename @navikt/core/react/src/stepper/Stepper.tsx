import React, { createContext, forwardRef } from "react";
import cl from "clsx";
import Step, { StepperStepProps, StepperStepType } from "./Step";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * <Stepper.Step /> elements
   */
  children: React.ReactNode;
  /**
   * The direction the component grows.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Current active step.
   * @note Stepper index starts at 1, not 0
   */
  activeStep: number;
  /**
   * Callback for next activeStep
   * @note Stepper index starts at 1, not 0
   */
  onStepChange?: (step: number) => void;
  /**
   * Makes stepper non-interactive if false
   * @default true
   */
  interactive?: boolean;
}

interface StepperComponent
  extends React.ForwardRefExoticComponent<
    StepperProps & React.RefAttributes<HTMLOListElement>
  > {
  Step: StepperStepType;
}

interface StepperContextProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  lastIndex: number;
  orientation: "horizontal" | "vertical";
  interactive: boolean;
}

export const StepperContext = createContext<StepperContextProps | null>(null);

export const Stepper: StepperComponent = forwardRef<
  HTMLOListElement,
  StepperProps
>(
  (
    {
      children,
      className,
      activeStep,
      orientation = "vertical",
      onStepChange = () => {},
      interactive = true,
      ...rest
    },
    ref
  ) => {
    activeStep = activeStep - 1;
    return (
      <ol
        {...rest}
        ref={ref}
        className={cl(
          "navds-stepper",
          orientation === "horizontal" ? "navds-stepper--horizontal" : "",
          className
        )}
      >
        <StepperContext.Provider
          value={{
            activeStep,
            onStepChange,
            lastIndex: React.Children.count(children),
            orientation,
            interactive,
          }}
        >
          {React.Children.map(children, (step, index) => {
            return (
              <li
                className={cl("navds-stepper__item")}
                key={index + (children?.toString?.() ?? "")}
              >
                <span className="navds-stepper__line navds-stepper__line--1" />
                {React.isValidElement<StepperStepProps>(step)
                  ? React.cloneElement(step, {
                      ...step.props,
                      unsafe_index: index,
                    })
                  : step}
                <span className="navds-stepper__line navds-stepper__line--2" />
              </li>
            );
          })}
        </StepperContext.Provider>
      </ol>
    );
  }
) as StepperComponent;

Stepper.Step = Step;

export default Stepper;
