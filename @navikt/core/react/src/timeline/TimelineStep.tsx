import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, BodyShort, Heading } from "..";

export interface TimelineStepProps
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
   * TimelineStep icon, accepts string or icon-element
   */
  icon?: React.ElementType;
}

export interface TimelineStepType
  extends React.ForwardRefExoticComponent<
    TimelineStepProps & React.RefAttributes<HTMLLIElement>
  > {}

export const TimelineStep = forwardRef<HTMLLIElement, TimelineStepProps>(
  (
    { className, children, time, description, icon: Icon, title, ...rest },
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
        <div className="navds-timeline__marker navds-timeline__marker--iconless">
          {Icon ? (
            <Icon aria-hidden />
          ) : (
            <div className="navds-timeline__marker--iconless" />
          )}
        </div>
        <Heading size="small" as="div" className="navds-timeline__title">
          {title}
          {description && (
            <BodyShort size="small" className="navds-timeline__description">
              {description}
            </BodyShort>
          )}
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
) as TimelineStepType;

export default TimelineStep;
