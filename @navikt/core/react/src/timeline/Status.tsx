import { Error, Success, Warning } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, BodyShort, Heading } from "..";

export interface TimelineStatusStepProps
  extends React.AnchorHTMLAttributes<HTMLLIElement> {
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
    TimelineStatusStepProps & React.RefAttributes<HTMLLIElement>
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

export const StatusStep = forwardRef<HTMLLIElement, TimelineStatusStepProps>(
  (
    { className, children, time, description, variant, title, ...rest },
    ref
  ) => {
    return (
      <li
        {...rest}
        aria-current={time === "present"}
        ref={ref}
        className={cl(
          "navds-timeline__item",
          `navds-timeline__item--${time}`,
          className
        )}
      >
        <div className="navds-timeline__marker">{getIcon(variant)}</div>
        <Heading size="small" as="div" className="navds-timeline__title">
          {title}
          {description && <BodyShort size="small">{description}</BodyShort>}
        </Heading>
        <div className="navds-timeline__content">
          {children && (
            <BodyLong className="navds-timeline__content-inner">
              {children}
            </BodyLong>
          )}
        </div>
        <span className="navds-timeline__line navds-timeline__line--1" />
        <span className="navds-timeline__line navds-timeline__line--2" />
      </li>
    );
  }
) as TimelineStatusStepType;

export default StatusStep;
