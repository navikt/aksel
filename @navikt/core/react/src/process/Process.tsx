import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Label } from "../typography";
import { createContext } from "../util/create-context";

// type ProcessVariant = "default" | "number" | "icon";

interface ProcessContextValue {
  lastIndex: number;
  hideCompletedContent: boolean;
  activeStep?: number;
  endless: boolean;
}

interface ProcessStepContextValue {
  index: number;
  active: boolean;
  lineActive: boolean;
}

const [ProcessContextProvider, useProcessContext] =
  createContext<ProcessContextValue>({
    hookName: "useProcessContext",
    providerName: "ProcessContextProvider",
    name: "ProcessContext",
    errorMessage: "<Process.Step> has to be used within <Process>",
  });

const [ProcessStepContextProvider, useProcessStepContext] =
  createContext<ProcessStepContextValue>({
    hookName: "useProcessStepContext",
    providerName: "ProcessStepContextProvider",
    name: "ProcessStepContext",
    errorMessage: "<Process.Step> has to be used within <Process>",
  });

interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * `<Process.Step />` elements.
   */
  children: React.ReactElement<typeof ProcessStep>[];
  /**
   * Index of current active step, all elements before this index will be highlighted.
   */
  activeStep?: number;
  /**
   * If true, the active items direction is reversed without reversing items order
   * @default false
   */
  reverseActiveDirection?: boolean;
  /**
   * Hide the content of steps that are completed.
   * Does not apply to the active step.
   * Can be overridden by setting the 'hideContent'-prop on individual steps.
   *
   * @default false
   */
  hideCompletedContent?: boolean;
  /**
   * When true, the last step will have a line that continues.
   * @default false
   */
  endless?: boolean;
}

interface ProcessComponent
  extends React.ForwardRefExoticComponent<
    ProcessProps & React.RefAttributes<HTMLOListElement>
  > {
  /**
   * @see 🏷️ {@link ProcessStepProps}
   */
  Step: typeof ProcessStep;
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
 *     variant="number"
 *     hideCompletedContent={true}
 *   >
 *     <Process.Step title="Start søknad" date="21. august 2025" />
 *     <Process.Step
 *       title="Saksopplysninger"
 *       date="22. august 2025"
 *       icon={<PaperclipIcon />}
 *     >
 *       Saksopplysninger er sendt inn
 *     </Process.Step>
 *     <Process.Step
 *       title="Vedlegg"
 *       date="25. august 2025"
 *       hideContent={false}
 *     >
 *       <h2> Vedlegg er lastet opp </h2>
 *       <p>
 *         Dokumentasjon av saksopplysninger er lastet opp og tilgjengelig for
 *         saksbehandler.
 *       </p>
 *     </Process.Step>
 *     <Process.Step title="Vedtak" date="8. september 2025">
 *       Det er gjort endelig vedtak i saken
 *     </Process.Step>
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
      reverseActiveDirection = false,
      activeStep = -1,
      hideCompletedContent = false,
      endless = false,
      ...restProps
    }: ProcessProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const childrenCount = React.Children.count(children);

    return (
      <ProcessContextProvider
        hideCompletedContent={hideCompletedContent}
        activeStep={activeStep}
        lastIndex={childrenCount - 1}
        endless={endless}
      >
        <ol
          data-color="info"
          {...restProps}
          ref={forwardedRef}
          className={cn("navds-process", className)}
        >
          {React.Children.map(children, (step, index) => {
            return (
              <ProcessStepContextProvider
                index={index}
                active={
                  reverseActiveDirection
                    ? activeStep >= childrenCount - index - 1
                    : activeStep >= index
                }
                lineActive={
                  reverseActiveDirection
                    ? activeStep >= childrenCount - index - 1
                    : activeStep >= index
                }
              >
                {step}
              </ProcessStepContextProvider>
            );
          })}
        </ol>
      </ProcessContextProvider>
    );
  },
) as ProcessComponent;

/* ------------------------------ Process Step ------------------------------ */
interface ProcessStepProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Rich content to display under the title (and date and/or
   * description, if provided)
   */
  children?: React.ReactNode;
  /**
   * Title
   */
  title?: string;
  /**
   * Date to display under the title
   */
  date?: string;
  /**
   * Icon or number to display inside the circle.
   */
  bullet?: React.ReactNode;
  /**
   * Set this step as completed.
   */
  completed?: boolean;
  /**
   * Hide the content section of the step.
   * Useful for overriding the Process-level 'hideCompletedContent'-prop.
   */
  hideContent?: boolean;
  /**
   * Changes line style for the step.
   * @default "solid"
   */
  lineVariant?: "solid" | "dashed";
}

export const ProcessStep = forwardRef<HTMLLIElement, ProcessStepProps>(
  (
    {
      title,
      date,
      children,
      bullet,
      completed,
      hideContent,
      lineVariant = "solid",
      className,
      ...restProps
    }: ProcessStepProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const { activeStep, hideCompletedContent, endless, lastIndex } =
      useProcessContext();

    const { index, active, lineActive } = useProcessStepContext();

    return (
      <li
        ref={forwardedRef}
        aria-current={index === activeStep}
        {...restProps}
        className={cn("navds-process__item", className, {
          "navds-process__item--small": bullet === undefined,
        })}
      >
        <div className={cn("navds-process__step")}>
          <BodyShort
            as="span"
            size="medium"
            weight="semibold"
            className={cn("navds-process__circle")}
            data-active={active}
            data-completed={completed}
            aria-hidden
          >
            {bullet}
          </BodyShort>

          <div className={cn("navds-process__content")}>
            {title && (
              <Label as="div" className={cn("navds-process__content-title")}>
                {title}
              </Label>
            )}
            {date && (
              <BodyShort
                size="small"
                spacing
                textColor="subtle"
                className={cn("navds-process__content-date")}
              >
                {date}
              </BodyShort>
            )}
            {!(
              hideContent ??
              (hideCompletedContent && completed && index !== activeStep)
            ) &&
              (children && typeof children === "string" ? (
                <BodyLong size="medium">{children}</BodyLong>
              ) : (
                children
              ))}
          </div>
        </div>
        {lastIndex > index || endless ? (
          <span
            className={cn(
              "navds-process__line navds-process__line-end",
              `navds-process__line--${lineVariant}`,
            )}
            data-line-active={lineActive}
          />
        ) : null}
      </li>
    );
  },
);

/* --------------------------- Proccess Utilities --------------------------- */

/* -------------------------- Process exports ------------------------- */
Process.Step = ProcessStep;

export type { ProcessProps, ProcessStepProps };
