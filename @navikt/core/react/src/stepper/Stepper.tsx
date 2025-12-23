import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import Step, { StepperStepProps } from "./Step";
import { StepperContextProvider } from "./context";

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * `<Stepper.Step />` elements.
   */
  children: React.ReactNode;
  /**
   * The direction the component grows.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Current active step.
   *
   * Stepper index starts at 1, not 0.
   */
  activeStep: number;
  /**
   * Callback for next `activeStep`.
   *
   * Stepper index starts at 1, not 0.
   */
  onStepChange?: (step: number) => void;
  /**
   * Makes stepper non-interactive if false.
   * @deprecated Use `interactive` prop on `<Stepper.Step />` instead for individual steps. For completely static steppers, use `Process` component instead.
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
  Step: typeof Step;
}

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
 *     onStepChange={setActiveStep}
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
    ref,
  ) => {
    const { cn } = useRenameCSS();
    activeStep = activeStep - 1;
    return (
      <ol
        {...rest}
        ref={ref}
        className={cn("navds-stepper", className)}
        data-orientation={orientation}
      >
        {React.Children.map(children, (step, index) => {
          const stepProps: Partial<StepperStepProps> =
            React.isValidElement<StepperStepProps>(step) ? step.props : {};

          const isInteractive = stepProps.interactive ?? interactive;

          return (
            <li
              className={cn("navds-stepper__item")}
              data-interactive={isInteractive}
              data-color={isInteractive ? undefined : "neutral"}
              key={index + (children?.toString?.() ?? "")}
            >
              <span
                className={cn("navds-stepper__line navds-stepper__line--1")}
              />
              <StepperContextProvider
                interactive={interactive}
                activeStep={activeStep}
                lastIndex={React.Children.count(children)}
                index={index}
                onStepChange={onStepChange}
                orientation={orientation}
              >
                {step}
              </StepperContextProvider>
              <span
                className={cn("navds-stepper__line navds-stepper__line--2")}
              />
            </li>
          );
        })}
      </ol>
    );
  },
) as StepperComponent;

Stepper.Step = Step;

export default Stepper;
