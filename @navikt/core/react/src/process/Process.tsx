/* eslint-disable jsx-a11y/no-redundant-roles */

/**
 * `<ol />` elements with `list-style: none;` tends to be ignored by voiceover on Safari.
 * To resolve this, we add `role="list"` to the `<ol />` element.
 */
import React, {
  SVGProps,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRenameCSS } from "../theme/Theme";
import { BodyLong, BodyShort, Heading } from "../typography";
import { useId } from "../util";
import { createContext } from "../util/create-context";
import { useMergeRefs } from "../util/hooks";
import { useI18n } from "../util/i18n/i18n.hooks";

interface ProcessProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * `<Process.Event />` elements.
   */
  children: React.ReactElement<typeof ProcessEvent>[];
  /**
   * Hides the "aktiv"-text when the event is active.
   * @default false
   */
  hideStatusText?: boolean;
}

type ProcessContextProps = Pick<ProcessProps, "hideStatusText"> & {
  rootId: string;
  syncAriaControls: () => void;
};

const [ProcessContextProvider, useProcessContext] =
  createContext<ProcessContextProps>({
    providerName: "ProcessContextProvider",
    hookName: "useProcessContext",
    name: "ProcessContext",
    errorMessage:
      "`<Process.Event />` must be used within a `<Process />` component.",
  });

interface ProcessComponent
  extends React.ForwardRefExoticComponent<
    ProcessProps & React.RefAttributes<HTMLOListElement>
  > {
  /**
   * @see 🏷️ {@link ProcessEventProps}
   */
  Event: typeof ProcessEvent;
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
 *     <Process.Event title="Start søknad" timestamp="21. august 2025" />
 *     <Process.Event
 *       title="Saksopplysninger"
 *       timestamp="22. august 2025"
 *       icon={<PaperclipIcon />}
 *     >
 *       Saksopplysninger er sendt inn
 *     </Process.Event>
 *     <Process.Event
 *       title="Vedlegg"
 *       timestamp="25. august 2025"
 *     >
 *       <h3> Vedlegg er lastet opp </h3>
 *       <p>
 *         Dokumentasjon av saksopplysninger er lastet opp og tilgjengelig for
 *         saksbehandler.
 *       </p>
 *     </Process.Event>
 *     <Process.Event title="Vedtak" timestamp="8. september 2025">
 *       Det er gjort endelig vedtak i saken
 *     </Process.Event>
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
      hideStatusText = false,
      id,
      ...restProps
    }: ProcessProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const rootId = useId(id);

    const rootRef = useRef<HTMLOListElement>(null);
    const mergedRef = useMergeRefs(forwardedRef, rootRef);

    const [activeChildId, setActiveChildId] = useState<string | undefined>(
      undefined,
    );

    const syncAriaControls = useCallback(() => {
      const activeChildren = rootRef.current?.querySelectorAll(
        '[data-process-event][aria-current="true"]',
      );

      if (!activeChildren) {
        setActiveChildId(undefined);
        return;
      }

      if (activeChildren.length > 1) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Aksel: Found multiple `<Process.Event />` elements with `status='active'`. Only one event should be active at a time.",
            rootRef.current,
          );
        }
        setActiveChildId(undefined);
        return;
      }

      if (activeChildren.length === 1) {
        const lastActiveChild = activeChildren[activeChildren.length - 1];
        setActiveChildId(lastActiveChild.id);
      } else {
        setActiveChildId(undefined);
      }
    }, []);

    return (
      <ol
        ref={mergedRef}
        data-color="info"
        role="list"
        {...restProps}
        className={cn("navds-process", className)}
        id={rootId}
        aria-controls={activeChildId}
      >
        <ProcessContextProvider
          hideStatusText={hideStatusText}
          rootId={rootId}
          syncAriaControls={syncAriaControls}
        >
          {children}
        </ProcessContextProvider>
      </ol>
    );
  },
) as ProcessComponent;

/* ------------------------------ Process Event ------------------------------ */
interface ProcessEventProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Rich content to display under the title and timestamp if provided.
   */
  children?: React.ReactNode;
  /**
   * Hide the content section of the event.
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
  /**
   * Current event status.
   * @default "inactive"
   */
  status?: "active" | "completed" | "inactive";
}

export const ProcessEvent = forwardRef<HTMLLIElement, ProcessEventProps>(
  (
    {
      title,
      timestamp,
      children,
      bullet,
      hideContent,
      className,
      id,
      status = "inactive",
      ...restProps
    }: ProcessEventProps,
    forwardedRef,
  ) => {
    const translate = useI18n("Process");
    const { cn } = useRenameCSS();
    const eventId = useId();
    const { syncAriaControls, hideStatusText, rootId } = useProcessContext();

    // syncAriaControls is already memoized with useCallback
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(syncAriaControls, [status]);

    const isActive = status === "active";

    return (
      <li
        ref={forwardedRef}
        aria-current={isActive}
        id={id ?? eventId}
        {...restProps}
        aria-controls={isActive ? rootId : undefined}
        className={cn("navds-process__event", className)}
        data-dot={bullet === undefined}
        data-process-event=""
        data-status={status}
      >
        <div className={cn("navds-process__item")}>
          <ProcessBullet>{bullet}</ProcessBullet>

          <div className={cn("navds-process__body")}>
            {title && <ProcessTitle>{title}</ProcessTitle>}
            {isActive && !hideStatusText && (
              <BodyShort
                size="small"
                className={cn("navds-process__active-label")}
              >
                {translate("active")}
              </BodyShort>
            )}
            {timestamp && <ProcessTimestamp>{timestamp}</ProcessTimestamp>}
            {!hideContent && !!children && (
              <ProcessContent>{children}</ProcessContent>
            )}
          </div>
        </div>
        <ProcessLine />
      </li>
    );
  },
);

/* ------------------------------ Process Title ----------------------------- */
interface ProcessTitleProps {
  /**
   * Title content.
   */
  children: React.ReactNode;
}

const ProcessTitle = ({ children }: ProcessTitleProps) => {
  const { cn } = useRenameCSS();

  return (
    <Heading size="small" as="div" className={cn("navds-process__title")}>
      {children}
    </Heading>
  );
};

/* ---------------------------- Process timestamp --------------------------- */
interface ProcessTimestampProps {
  /**
   * Timestamp content.
   */
  children: React.ReactNode;
}

const ProcessTimestamp = ({ children }: ProcessTimestampProps) => {
  const { cn } = useRenameCSS();

  return (
    <BodyShort
      spacing
      as="div"
      size="small"
      textColor="subtle"
      className={cn("navds-process__timestamp")}
    >
      {children}
    </BodyShort>
  );
};

/* ----------------------------- Process Content ---------------------------- */
interface ProcessContentProps {
  /**
   * Content content.
   */
  children: React.ReactNode;
}

const ProcessContent = ({ children }: ProcessContentProps) => {
  const { cn } = useRenameCSS();

  return (
    <BodyLong as="div" className={cn("navds-process__content")}>
      {children}
    </BodyLong>
  );
};

/* ----------------------------- Process Bullet ----------------------------- */
interface ProcessBulletProps {
  /**
   * Bullet content.
   */
  children: React.ReactNode;
}

const ProcessBullet = ({ children }: ProcessBulletProps) => {
  const { cn } = useRenameCSS();

  return (
    <BodyShort
      as="span"
      weight="semibold"
      className={cn("navds-process__bullet")}
      aria-hidden
    >
      {children}
    </BodyShort>
  );
};

/* ------------------------------ Process Line ------------------------------ */
const ProcessLine = () => {
  const { cn } = useRenameCSS();

  return <span className={cn("navds-process__line")} />;
};

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
Process.Event = ProcessEvent;
Process.Checkmark = ProcessCheckmark;

export type { ProcessCheckmarkProps, ProcessEventProps, ProcessProps };
