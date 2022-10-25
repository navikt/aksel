import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, Label } from "..";

export interface TimelineInfoStepProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   *
   */
  icon: React.ElementType;
  /**
   *
   */
  time: "present" | "future" | "past";
}

export interface TimelineInfoStepType
  extends React.ForwardRefExoticComponent<
    TimelineInfoStepProps & React.RefAttributes<HTMLDivElement>
  > {}

export const InfoStep = forwardRef<HTMLDivElement, TimelineInfoStepProps>(
  ({ className, children, icon: Icon, time, title, ...rest }, ref) => {
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
          <BodyLong as="div" className="navds-timeline__content-description">
            {children}
          </BodyLong>
        </div>
      </div>
    );
  }
) as TimelineInfoStepType;

export default InfoStep;
