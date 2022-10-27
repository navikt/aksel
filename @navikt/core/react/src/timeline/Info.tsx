import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, BodyShort, Heading } from "..";

export interface TimelineInfoStepProps
  extends React.AnchorHTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  /**
   *
   */
  icon: React.ElementType;
  /**
   *  When in the process is this
   */
  time: "present" | "future" | "past";
  /**
   * Short description of date. Example: DU ER HER 23. OKTOBER 2022
   */
  description?: string;
}

export interface TimelineInfoStepType
  extends React.ForwardRefExoticComponent<
    TimelineInfoStepProps & React.RefAttributes<HTMLLIElement>
  > {}

export const InfoStep = forwardRef<HTMLLIElement, TimelineInfoStepProps>(
  (
    { className, children, icon: Icon, time, description, title, ...rest },
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
        <div className="navds-timeline__marker">
          <Icon aria-hidden />
        </div>
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
) as TimelineInfoStepType;

export default InfoStep;
