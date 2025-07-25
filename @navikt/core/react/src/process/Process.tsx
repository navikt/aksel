import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import Step, { ProcessStepProps } from "./Step";
import { ProcessContextProvider } from "./context";

export interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * `<Process.Step />` elements.
   */
  children: React.ReactNode;
  /**
   * Current active step.
   *
   * Process index starts at 1, not 0.
   */
  activeStep: number;
  /**
   * Callback for next `activeStep`.
   *
   * Process index starts at 1, not 0.
   */
  onStepChange?: (step: number) => void;
  /**
   * Makes Process non-interactive if false.
   * @default true
   */
  interactive?: boolean;
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
 * A component that displays a Process with clickable steps.
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
 *     onStepChange={setActiveStep}
 *   >
 *     <Process.Step href="#">Start søknad</Process.Step>
 *     <Process.Step href="#">Saksopplysninger</Process.Step>
 *     <Process.Step href="#">Vedlegg</Process.Step>
 *   </Process>
 * </>
 * ```
 */
export const Process: ProcessComponent = forwardRef<
  HTMLOListElement,
  ProcessProps
>(
  (
    {
      children,
      className,
      activeStep,
      onStepChange = () => {},
      interactive = true,
      ...rest
    },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    activeStep = activeStep - 1;
    return (
      // TODO: (stw) Add component level props: 'variant=default|number|icon'
      <ol {...rest} ref={ref} className={cn("navds-process", className)}>
        {React.Children.map(children, (step, index) => {
          const stepProps: Partial<ProcessStepProps> =
            React.isValidElement<ProcessStepProps>(step) ? step.props : {};

          const isInteractive = stepProps.interactive ?? interactive;

          return (
            // TODO: (stw) Add step level props: 'showDate=T|F, showDescription=T|F, showSlot=T|F, showLine=T|F'
            // TODO: (stw) Or: 'showDate=date|F, showDescription=description|F, showSlot=slot|F, showLine=T|F'
            <li
              className={cn("navds-process__item", {
                /* TODO: Remove these 3 classNames in darkmode update (stw: ???) */
                "navds-process__item--behind": activeStep > index,
                "navds-process__item--completed": stepProps.completed,
                "navds-process__item--non-interactive": !isInteractive,
              })}
              data-color={isInteractive ? undefined : "neutral"}
              key={index + (children?.toString?.() ?? "")}
            >
              <span
                className={cn("navds-process__line navds-process__line--1")}
              />
              {/* TODO: (stw) Pass step-props with context */}
              <ProcessContextProvider
                interactive={interactive}
                activeStep={activeStep}
                lastIndex={React.Children.count(children)}
                index={index}
                onStepChange={onStepChange}
              >
                {step}
              </ProcessContextProvider>
              <span
                className={cn("navds-process__line navds-process__line--2")}
              />
            </li>
          );
        })}
      </ol>
    );
  },
) as ProcessComponent;

Process.Step = Step;

export default Process;
