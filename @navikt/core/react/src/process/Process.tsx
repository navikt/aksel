/* eslint-disable jsx-a11y/no-redundant-roles */

/**
 * `<ol />` elements with `list-style: none;` tends to be ignored by voiceover on Safari.
 * To resolve this, we add `role="list"` to the `<ol />` element.
 */
import React, {
  SVGProps,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Heading } from "../typography";
import { useId } from "../util";
import { createContext } from "../util/create-context";
import { useMergeRefs } from "../util/hooks";

interface ProcessContextValue {
  lastIndex: number;
  activeStep?: number;
  rootId: string;
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
   * Index of current active step. This step and all steps before it will be highlighted.
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
  /**
   * @see 🏷️ {@link ProcessCheckmarkProps}
   */
  Checkmark: typeof ProcessCheckmark;
}

/**
 * A component that presents a Process as a vertical line of events.
 * Each event can contain information, actions, links or status indicators.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/process)
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
 *       <h3> Vedlegg er lastet opp </h3>
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
    { children, className, activeStep = -1, id, ...restProps }: ProcessProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const rootRef = useRef<HTMLOListElement>(null);
    const mergedRef = useMergeRefs(forwardedRef, rootRef);

    const childrenCount = React.Children.count(children);
    const rootId = useId();

    const [childId, setChildId] = useState<string | undefined>();

    useEffect(() => {
      const root = rootRef.current;
      if (!root || activeStep < 0) {
        return;
      }
      const currentActiveStep = root.querySelector(
        '[data-process-step][aria-current="true"]',
      );
      setChildId(currentActiveStep?.id);
    }, [activeStep]);

    return (
      <ProcessContextProvider
        activeStep={activeStep}
        lastIndex={childrenCount - 1}
        rootId={id ?? rootId}
      >
        <ol
          ref={mergedRef}
          data-color="info"
          id={id ?? rootId}
          role="list"
          {...restProps}
          className={cn("navds-process", className)}
          aria-controls={childId}
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
   * Rich content to display under the title and timestamp if provided.
   */
  children?: React.ReactNode;
  /**
   * Hide the content section of the step.
   */
  hideContent?: boolean;
  /**
   * Step title.
   */
  title?: string;
  /**
   * Timestamp or date to display for event.
   */
  timestamp?: string;
  /**
   * Icon or number to display inside the bullet.
   */
  bullet?: React.ReactNode;
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
      id,
      ...restProps
    }: ProcessStepProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const stepId = useId();

    const { activeStep, lastIndex, rootId } = useProcessContext();
    const { index } = useProcessStepContext();

    const isActive = index === activeStep;

    return (
      <li
        ref={forwardedRef}
        aria-current={isActive}
        aria-controls={isActive ? rootId : undefined}
        id={id ?? stepId}
        {...restProps}
        className={cn("navds-process__step", className)}
        data-dot={bullet === undefined}
        data-process-step=""
      >
        <div className={cn("navds-process__item")}>
          <ProcessBullet>{bullet}</ProcessBullet>

          <div className={cn("navds-process__body")}>
            {title && <ProcessTitle>{title}</ProcessTitle>}
            {timestamp && <ProcessTimestamp>{timestamp}</ProcessTimestamp>}
            {!hideContent && !!children && (
              <ProcessContent>{children}</ProcessContent>
            )}
          </div>
        </div>
        {lastIndex > index && <ProcessLine data-current={isActive} />}
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
        className={cn("navds-process__title", className)}
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
        as="div"
        {...restProps}
        size="small"
        textColor="subtle"
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
}

const ProcessContent = forwardRef<HTMLDivElement, ProcessContentProps>(
  (
    { children, className, ...restProps }: ProcessContentProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <BodyLong
        ref={forwardedRef}
        {...restProps}
        as="div"
        className={cn("navds-process__content", className)}
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
}

const ProcessBullet = forwardRef<HTMLSpanElement, ProcessBulletProps>(
  ({ children, className, ...restProps }: ProcessBulletProps, forwardedRef) => {
    const { cn } = useRenameCSS();

    const { active } = useProcessStepContext();

    return (
      <BodyShort
        ref={forwardedRef}
        {...restProps}
        as="span"
        weight="semibold"
        className={cn("navds-process__bullet", className)}
        data-active={active}
        aria-hidden
      >
        {children}
      </BodyShort>
    );
  },
);

/* ------------------------------ Process Line ------------------------------ */
type ProcessLineProps = React.HTMLAttributes<HTMLSpanElement>;

const ProcessLine = forwardRef<HTMLSpanElement, ProcessLineProps>(
  ({ children, className, ...restProps }: ProcessLineProps, forwardedRef) => {
    const { cn } = useRenameCSS();
    const { lineActive } = useProcessStepContext();

    return (
      <span
        ref={forwardedRef}
        {...restProps}
        className={cn("navds-process__line", className)}
        data-active={lineActive}
      >
        {children}
      </span>
    );
  },
);

/* ---------------------------- Process Checkmark --------------------------- */
type ProcessCheckmarkProps = Omit<SVGProps<SVGSVGElement>, "ref">;

export const ProcessCheckmark = forwardRef<
  SVGSVGElement,
  ProcessCheckmarkProps
>(({ className, ...restProps }: ProcessCheckmarkProps, forwardedRef) => {
  const { cn } = useRenameCSS();
  return (
    <svg
      ref={forwardedRef}
      {...restProps}
      className={cn("navds-process__checkmark", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      focusable="false"
      aria-hidden
    >
      <path
        d="M9.53518 13.4148L15.9751 7.40467C16.5792 6.83965 17.5289 6.86933 18.0954 7.47478C18.6619 8.08027 18.6295 9.03007 18.0244 9.59621L10.5211 16.5993C10.2409 16.859 9.87553 17 9.50019 17C9.10645 17 8.72711 16.8462 8.43908 16.5611L5.93908 14.0611C5.35356 13.4756 5.35356 12.5254 5.93908 11.9399C6.52461 11.3544 7.47477 11.3544 8.0603 11.9399L9.53518 13.4148Z"
        fill="currentColor"
      />
    </svg>
  );
});

/* -------------------------- Process exports ------------------------- */
Process.Step = ProcessStep;
Process.Checkmark = ProcessCheckmark;

export type { ProcessProps, ProcessStepProps, ProcessCheckmarkProps };
