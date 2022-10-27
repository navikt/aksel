import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyLong, BodyShort } from "..";

export interface TimelineContStepProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   *  When in the process is this
   */
  time: "present" | "future" | "past";
}

export interface TimelineContStepType
  extends React.ForwardRefExoticComponent<
    TimelineContStepProps & React.RefAttributes<HTMLDivElement>
  > {}

export const ContStep = forwardRef<HTMLDivElement, TimelineContStepProps>(
  ({ className, children, time, ...rest }, ref) => {
    return (
      <div className="navds-timeline__cont">
        <div className="navds-timeline__bullet" />
        <div className="navds-timeline__content">
          {children && (
            <BodyLong className="navds-timeline__content-inner">
              {children}
            </BodyLong>
          )}
        </div>
      </div>
    );
  }
) as TimelineContStepType;

export default ContStep;
