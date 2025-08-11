import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Label } from "../typography";
import { createContext } from "../util/create-context";

type ProcessVariant = "default" | "number" | "icon";

interface ProcessContextValue {
  activeStep: number;
  index: number;
  lastIndex: number;
  variant: ProcessVariant;
  hideCompletedContent: boolean;
}

const [ProcessContextProvider, useProcessContext] =
  createContext<ProcessContextValue>({
    hookName: "useProcessContext",
    providerName: "ProcessContextProvider",
    name: "ProcessContext",
    errorMessage: "<Process.Step> has to be used within <Process>",
  });

interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * Current active step.
   *
   * Process index starts at 1, not 0.
   *
   * @default 0
   */
  activeStep?: number;
  /**
   * `<Process.Step />` elements.
   */
  children: React.ReactElement<typeof ProcessStep>[];
  /**
   * Styling variant for the step indicators:
   * - "default": Small bullet-like circles
   * - "number": Large circles with sequential numbers
   * - "icon": Large circles with checkmarks for completed steps
   *
   * @default "default"
   */
  variant?: ProcessVariant;
  /**
   * Hide the content of steps that are completed.
   * Does not apply to the active step.
   * Can be overridden by setting the 'hideContent'-prop on individual steps.
   *
   * @default false
   */
  hideCompletedContent?: boolean;
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
      activeStep = 0,
      children,
      variant = "default",
      hideCompletedContent = false,
      className,
      ...rest
    },
    ref,
  ) => {
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
                activeStep={activeStep}
                index={index}
                lastIndex={React.Children.count(children)}
                variant={variant}
                hideCompletedContent={hideCompletedContent}
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
  },
) as ProcessComponent;

/* ------------------------------ Process Step ------------------------------ */
interface ProcessStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title
   */
  title?: string;
  /**
   * Date to display under the title
   */
  date?: string;
  /**
   * Rich content to display under the title (and date and/or
   * description, if provided)
   */
  children?: React.ReactNode;
  /**
   * Icon to display inside the circle.
   *
   * Providing an icon will override the variant set on the parent Process for
   * this step, forcing a large circle with the specified icon for this step
   * only.
   *
   * If no icon is provided and the variant is "icon", a <CheckmarkIcon /> will
   * be used by default.
   *
   * @default <CheckmarkIcon />
   */
  icon?: React.ReactNode;
  /**
   * Set this step as completed.
   *
   * If not set, it will default to true for every step before and including
   * activeStep, and false for every step after activeStep.
   */
  completed?: boolean;
  /**
   * Hide the content section of the step.
   * Useful for overriding the Process-level 'hideCompletedContent'-prop.
   */
  hideContent?: boolean;
}

export const ProcessStep = forwardRef<HTMLDivElement, ProcessStepProps>(
  (
    { title, date, children, icon, completed, hideContent, className, ...rest },
    ref,
  ) => {
    const { cn } = useRenameCSS();
    const {
      activeStep,
      index,
      variant = "default",
      hideCompletedContent,
    } = useProcessContext();
    completed = completed ?? index <= activeStep;

    if (variant === "icon" && completed && icon === undefined) {
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          focusable={false}
          role="img"
          aria-hidden
        >
          <path
            d="M10.0352 13.4148L16.4752 7.40467C17.0792 6.83965 18.029 6.86933 18.5955 7.47478C19.162 8.08027 19.1296 9.03007 18.5245 9.59621L11.0211 16.5993C10.741 16.859 10.3756 17 10.0002 17C9.60651 17 9.22717 16.8462 8.93914 16.5611L6.43914 14.0611C5.85362 13.4756 5.85362 12.5254 6.43914 11.9399C7.02467 11.3544 7.97483 11.3544 8.56036 11.9399L10.0352 13.4148Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    return (
      <div
        {...rest}
        aria-current={index === activeStep}
        ref={ref}
        className={cn("navds-process__step", className)}
      >
        <BodyShort
          as="span"
          size="medium"
          weight="semibold"
          className={cn("navds-process__circle", {
            "navds-process__circle--small": variant === "default" && !icon,
            "navds-process__circle--icon": icon,
          })}
          data-active={index === activeStep}
          data-completed={completed}
          aria-hidden={variant !== "default"}
        >
          {icon || (variant === "number" && index + 1)}
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
    );
  },
);

/* -------------------------- Process exports ------------------------- */
Process.Step = ProcessStep;

export type { ProcessProps, ProcessStepProps };
