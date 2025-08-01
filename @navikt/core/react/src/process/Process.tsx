import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import Step, { ProcessStepProps } from "./Step";
import { ProcessContextProvider } from "./context";

// TODO (stw): ✅ Process-component requirements
// Presentation:
// - ✅ Bubble (dot, number or icon) - tied to variant
// - ✅ Line (dashed or solid) - tied to state
// - ✅ Content
//   - Title
//   - Date (optional)
//   - Description (optional)
//   - Custom component(s) (optional)

// Variants:
// - ✅ Dots
// - ✅ Numbered: dev specified, with fallback
// - ✅ Icons: dev specified, with fallback

// State:
// - ✅ CurrentStep/ActiveStep:
//   - stepIndex < ActiveStep -> 'completed'
//   - stepIndex = ActiveStep -> 'current'
//   - stepIndex > ActiveStep -> 'uncompleted'

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
  children: React.ReactNode;
  /**
   * Variant of the bullets to use: a small solid bubble,
   * a bubble that fits a number inside, or a bubble that fits an icon inside
   * @default "default"
   */
  variant?: "default" | "number" | "icon";
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
>(({ variant = "default", children, className, activeStep, ...rest }, ref) => {
  const { cn } = useRenameCSS();
  activeStep = activeStep - 1;
  return (
    <ol
      // TODO (stw): data-color set on higher level? Otherwise set to 'info'
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
              (stepProps.variant === "default" ||
                (stepProps.variant === undefined && variant === "default")) &&
                "navds-process__item-no-gap",
            )}
            key={index + (children?.toString?.() ?? "")}
          >
            <span
              className={cn(
                "navds-process__line navds-process__line--1",
                index >= activeStep && "navds-process__line--uncompleted",
              )}
            />
            {/* TODO (stw): Add step level props: 'showDate=T|F, showDescription=T|F, showSlot=T|F, showLine=T|F' */}
            {/* TODO (stw): Or: 'showDate=date|F, showDescription=description|F, showSlot=slot|F, showLine=T|F' */}
            {/* TODO (stw): Pass step-props with context */}
            <ProcessContextProvider
              variant={variant}
              activeStep={activeStep}
              lastIndex={React.Children.count(children)}
              index={index}
            >
              {step}
            </ProcessContextProvider>
            {!stepProps.hideLine && (
              <span
                className={cn(
                  "navds-process__line navds-process__line--2",
                  index >= activeStep && "navds-process__line--uncompleted",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}) as ProcessComponent;

Process.Step = Step;

export default Process;
