import React, { createContext, forwardRef } from "react";
import cl from "clsx";
import Step, { StepperStepProps } from "./Step";
import { OverridableComponent } from "../util/OverridableComponent";

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
  /**
   * @see 🏷️ {@link StepperStepProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Step: OverridableComponent<StepperStepProps, HTMLAnchorElement>;
}

interface StepperContextProps {
  activeStep: number;
  onStepChange: (step: number) => void;
  lastIndex: number;
  orientation: "horizontal" | "vertical";
  interactive: boolean;
}

export const StepperContext = createContext<StepperContextProps | null>(null);

/**
 * A component that displays a stepper with clickable steps.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/stepper)
 * @see 🏷️ {@link StepperProps}
 *
 * @example
 * ```jsx
 * <>
 *   <Heading size="medium" spacing level="2" id="stepper-heading">
 *     Søknadssteg
 *   </Heading>
 *   <Stepper
 *     aria-labelledby="stepper-heading"
 *     activeStep={activeStep}
 *     onStepChange={(x) => setActiveStep(x)}
 *   >
 *     <Stepper.Step href="#">Start søknad</Stepper.Step>
 *     <Stepper.Step href="#">Saksopplysninger</Stepper.Step>
 *     <Stepper.Step href="#">Vedlegg</Stepper.Step>
 *   </Stepper>
 * </>
 * ```
 */
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
