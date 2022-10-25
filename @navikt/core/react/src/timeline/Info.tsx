import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, Detail, Label } from "..";

export interface TimelineInfoStepProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
    TimelineInfoStepProps & React.RefAttributes<HTMLDivElement>
  > {}

export const InfoStep = forwardRef<HTMLDivElement, TimelineInfoStepProps>(
  (
    { className, children, icon: Icon, time, description, title, ...rest },
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
        <div className="navds-timeline__icon">
          <Icon aria-hidden />
        </div>
        <div className="navds-timeline__content">
          <Label as="div" className="navds-timeline__content-label">
            {title}
          </Label>
          {description && <Detail>{description}</Detail>}
          <BodyLong as="div" className="navds-timeline__content-description">
            {children}
          </BodyLong>
        </div>
      </div>
    );
  }
) as TimelineInfoStepType;

export default InfoStep;
