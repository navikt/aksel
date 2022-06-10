import React, { createContext, forwardRef } from "react";
import cl from "classnames";
import Step, { StepperStepProps, StepperStepType } from "./Step";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * <Stepper.Step /> elements
   */
  children: React.ReactNode;
  /**
   * Adds classname to wrapper
   */
  className?: string;
  /**
   * The direction the component grows. Default is "vertical".
   */
  horisontal?: boolean;
  /**
   * Current active step index
   */
  activeStep: number;
  /**
   * Callback for clicked step index
   */
  onStepChange?: (step: number) => void;
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
  horisontal?: boolean;
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
      horisontal = false,
      onStepChange = () => {},
      ...rest
    },
    ref
  ) => {
    const horisontalClass = horisontal ? "horisontal" : "";
    return (
      <ol
        {...rest}
        ref={ref}
        className={cl("navds-stepper", horisontalClass, className)}
      >
        <StepperContext.Provider
          value={{
            activeStep,
            onStepChange,
            lastIndex: React.Children.count(children),
            horisontal,
          }}
        >
          {React.Children.map(children, (step, index) => {
            return (
              <li
                className={cl("navds-stepper__step-wrapper", horisontalClass)}
                key={index + (children?.toString?.() ?? "")}
              >
                {React.isValidElement<StepperStepProps>(step)
                  ? React.cloneElement(step, { ...step.props, index })
                  : step}
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
