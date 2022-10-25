import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, BodyShort, Label } from "..";
import { Error, Success, Warning } from "@navikt/ds-icons";

export interface TimelineStatusStepProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   *  When in the process is this
   */
  time: "present" | "future" | "past";
  /**
   * Short description of date. Example: DU ER HER 23. OKTOBER 2022
   */
  description?: string;
  /**
   * Status symbol
   */
  variant: "success" | "warning" | "error";
}

export interface TimelineStatusStepType
  extends React.ForwardRefExoticComponent<
    TimelineStatusStepProps & React.RefAttributes<HTMLDivElement>
  > {}

const getIcon = (variant: "success" | "warning" | "error") => {
  switch (variant) {
    case "success":
      return (
        <Success
          aria-hidden
          title="feil"
          color="var(--navds-global-color-green-600)"
        />
      );
    case "warning":
      return (
        <Warning
          aria-hidden
          color="var(--navds-global-color-orange-600)"
          title="advarsel"
        />
      );
    case "error":
      return (
        <Error
          aria-hidden
          title="suksess"
          color="var(--navds-global-color-red-500)"
        />
      );
    default:
      return null;
  }
};

export const StatusStep = forwardRef<HTMLDivElement, TimelineStatusStepProps>(
  (
    { className, children, time, description, variant, title, ...rest },
    ref
  ) => {
    return (
      <div
        {...rest}
        aria-current={time === "present"}
        ref={ref}
        className={cl(
          "navds-timeline__step",
          `navds-timeline__step--${time}`,
          className
        )}
      >
        <div className="navds-timeline__icon">{getIcon(variant)}</div>
        <div className="navds-timeline__content">
          <Label as="dt" className="navds-timeline__content-label">
            {title}
          </Label>
          {description && (
            <BodyShort as="dt" size="small">
              {description}
            </BodyShort>
          )}
          {children && (
            <BodyLong as="dd" className="navds-timeline__content-description">
              {children}
            </BodyLong>
          )}
        </div>
      </div>
    );
  }
) as TimelineStatusStepType;

export default StatusStep;
