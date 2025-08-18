import React, { forwardRef } from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Heading } from "../typography";
import { createContext } from "../util/create-context";

// type ProcessVariant = "default" | "number" | "icon";

interface ProcessContextValue {
  lastIndex: number;
  activeStep?: number;
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
 *   >
 *     <Process.Step title="Start søknad" timestamp="21. august 2025" />
 *     <Process.Step
 *       title="Saksopplysninger"
 *       timestamp="22. august 2025"
 *       icon={<PaperclipIcon />}
 *     >
 *       Saksopplysninger er sendt inn
 *     </Process.Step>
 *     <Process.Step
 *       title="Vedlegg"
 *       timestamp="25. august 2025"
 *     >
 *       <h2> Vedlegg er lastet opp </h2>
 *       <p>
 *         Dokumentasjon av saksopplysninger er lastet opp og tilgjengelig for
 *         saksbehandler.
 *       </p>
 *     </Process.Step>
 *     <Process.Step title="Vedtak" timestamp="8. september 2025">
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
    { children, className, activeStep = -1, ...restProps }: ProcessProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const childrenCount = React.Children.count(children);

    return (
      <ProcessContextProvider
        activeStep={activeStep}
        lastIndex={childrenCount - 1}
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
                active={activeStep >= index}
                lineActive={activeStep >= index}
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
   * Timestamp or date to display under the title.
   */
  timestamp?: string;
  /**
   * Icon or number to display inside the bullet.
   */
  bullet?: React.ReactNode;
  /**
   * Hide the content section of the step.
   */
  hideContent?: boolean;
}

export const ProcessStep = forwardRef<HTMLLIElement, ProcessStepProps>(
  (
    {
      title,
      timestamp,
      children,
      bullet,
      hideContent,
      className,
      ...restProps
    }: ProcessStepProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const { activeStep, lastIndex } = useProcessContext();

    const { index } = useProcessStepContext();

    return (
      <li
        ref={forwardedRef}
        aria-current={index === activeStep}
        {...restProps}
        className={cn("navds-process__step", className)}
        data-dot={bullet === undefined}
      >
        <div className={cn("navds-process__item")}>
          <ProcessBullet>{bullet}</ProcessBullet>

          <div className={cn("navds-process__content")}>
            {title && <ProcessTitle>{title}</ProcessTitle>}
            {timestamp && <ProcessTimestamp>{timestamp}</ProcessTimestamp>}
            {!hideContent && <ProcessContent>{children}</ProcessContent>}
          </div>
        </div>
        {lastIndex > index && (
          <ProcessLine data-current={index === activeStep} />
        )}
      </li>
    );
  },
);

/* ------------------------------ Process Title ----------------------------- */
interface ProcessTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title content.
   */
  children: React.ReactNode;
  /**
   * Additional class names to apply to the title.
   */
  className?: string;
}

const ProcessTitle = forwardRef<HTMLDivElement, ProcessTitleProps>(
  ({ children, className, ...restProps }: ProcessTitleProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    return (
      <Heading
        ref={forwardedRef}
        size="small"
        {...restProps}
        as="div"
        className={cn("navds-process__content-title", className)}
      >
        {children}
      </Heading>
    );
  },
);

/* ---------------------------- Process timestamp --------------------------- */
interface ProcessTimestampProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Timestamp content.
   */
  children: React.ReactNode;
  /**
   * Additional class names to apply to the timestamp.
   */
  className?: string;
}

const ProcessTimestamp = forwardRef<HTMLDivElement, ProcessTimestampProps>(
  (
    { children, className, ...restProps }: ProcessTimestampProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <BodyShort
        ref={forwardedRef}
        spacing
        {...restProps}
        size="small"
        textColor="subtle"
        as="div"
        className={cn("navds-process__timestamp", className)}
      >
        {children}
      </BodyShort>
    );
  },
);

/* ----------------------------- Process Content ---------------------------- */
interface ProcessContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content content.
   */
  children: React.ReactNode;
  /**
   * Additional class names to apply to the content.
   */
  className?: string;
}

const ProcessContent = forwardRef<HTMLDivElement, ProcessContentProps>(
  (
    { children, className, ...restProps }: ProcessContentProps,
    forwardedRef,
  ) => {
    return (
      <BodyLong
        ref={forwardedRef}
        {...restProps}
        as="div"
        className={className}
      >
        {children}
      </BodyLong>
    );
  },
);

/* ----------------------------- Process Bullet ----------------------------- */
interface ProcessBulletProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Bullet content.
   */
  children: React.ReactNode;
  /**
   * Additional class names to apply to the bullet.
   */
  className?: string;
  /**
   * If true, the bullet is active.
   * @default Controlled by Process Step
   */
  active?: boolean;
}

const ProcessBullet = forwardRef<HTMLSpanElement, ProcessBulletProps>(
  (
    { children, className, active: _active, ...restProps }: ProcessBulletProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const { active } = useProcessStepContext();

    return (
      <BodyShort
        ref={forwardedRef}
        {...restProps}
        as="span"
        weight="semibold"
        className={cn("navds-process__bullet", className)}
        data-active={_active ?? active}
        aria-hidden
      >
        {children}
      </BodyShort>
    );
  },
);

/* ------------------------------ Process Line ------------------------------ */
interface ProcessLineProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Additional class names to apply to the line.
   */
  className?: string;
  /**
   * If true, the line is active.
   * @default Controlled by Process Step
   */
  lineActive?: boolean;
}

const ProcessLine = forwardRef<HTMLSpanElement, ProcessLineProps>(
  (
    {
      children,
      className,
      lineActive: _lineActive,
      ...restProps
    }: ProcessLineProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const { lineActive } = useProcessStepContext();

    return (
      <span
        ref={forwardedRef}
        {...restProps}
        className={cn("navds-process__line navds-process__line-end", className)}
        data-line-active={_lineActive ?? lineActive}
      >
        {children}
      </span>
    );
  },
);

/* TODO: Create a Process.Checkmark icons */
/* TODO: Fix border-gradient on dashed line */

/* -------------------------- Process exports ------------------------- */
Process.Step = ProcessStep;

export type { ProcessProps, ProcessStepProps };
