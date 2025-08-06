import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { ProcessVariant } from "./ProcessVariant";
import Step, { ProcessStepProps } from "./Step";
import { ProcessContextProvider } from "./context";

export interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * Current active step.
   *
   * Process index starts at 1, not 0.
   */
  activeStep: number;
  /**
   * `<Process.Step />` elements.
   */
  children: React.ReactElement<typeof Step>[];
  /**
   * Styling variant for the step indicators:
   * - "default": Small bullet-like circles
   * - "number": Large circles with sequential numbers
   * - "icon": Large circles with checkmarks for completed steps
   *
   * @default "default"
   */
  variant?: ProcessVariant;
}

interface ProcessComponent
  extends React.ForwardRefExoticComponent<
    ProcessProps & React.RefAttributes<HTMLOListElement>
  > {
  /**
   * @see 🏷️ {@link ProcessStepProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Step: typeof Step;
}

/**
 * A component that presents a Process as a vertical line of steps.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/Process)
 * @see 🏷️ {@link ProcessProps}
 *
 * @example
 * ```jsx
 * <>
 *   <Heading size="medium" spacing level="2" id="Process-heading">
 *     Søknadssteg
 *   </Heading>
 *   <Process
 *     aria-labelledby="Process-heading"
 *     activeStep={activeStep}
 *   >
 *     <Process.Step
 *       title="Start søknad"
 *       date="21. august 2025"
 *     />
 *     <Process.Step
 *       title="Saksopplysninger"
 *       date="22. august 2025"
 *       description="Saksopplysninger er sendt inn"
 *     />
 *     <Process.Step
 *       title="Vedlegg"
 *       date="25. august 2025"
 *       description="Vedlegg er lastet opp"
 *     />
 *     <Process.Step
 *       title="Vedtak"
 *       date="8. september 2025"
 *       description="Det er gjort endelig vedtak i saken"
 *     />
 *   </Process>
 * </>
 * ```
 */
export const Process: ProcessComponent = forwardRef<
  HTMLOListElement,
  ProcessProps
>(({ variant = "default", children, className, activeStep, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  activeStep = activeStep - 1;
  return (
    <ol
      data-color="info"
      {...rest}
      ref={ref}
      className={cn("navds-process", className)}
    >
      {React.Children.map(children, (step, index) => {
        const stepProps: Partial<ProcessStepProps> =
          React.isValidElement<ProcessStepProps>(step) ? step.props : {};

        return (
          <li
            className={cn(
              "navds-process__item",
              variant === "default" &&
                !stepProps.icon &&
                "navds-process__item-no-gap",
            )}
            data-color={stepProps["data-color"]}
            key={index + (children?.toString?.() ?? "")}
          >
            <span
              className={cn(
                "navds-process__line navds-process__line--1",
                index >= activeStep && "navds-process__line--uncompleted",
              )}
            />
            <ProcessContextProvider
              variant={variant}
              activeStep={activeStep}
              lastIndex={React.Children.count(children)}
              index={index}
            >
              {step}
            </ProcessContextProvider>
            <span
              className={cn(
                "navds-process__line navds-process__line--2",
                index >= activeStep && "navds-process__line--uncompleted",
              )}
            />
          </li>
        );
      })}
    </ol>
  );
}) as ProcessComponent;

Process.Step = Step;

export default Process;
