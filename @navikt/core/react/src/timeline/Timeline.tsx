import cl from "clsx";
import React, { forwardRef } from "react";
import ContStep, { TimelineContStepType } from "./Cont";
import InfoStep, { TimelineInfoStepType } from "./Info";
import StatusStep, { TimelineStatusStepType } from "./Status";

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * <Timeline.Step /> elements
   */
  children: React.ReactNode;
}

interface TimelineComponent
  extends React.ForwardRefExoticComponent<
    TimelineProps & React.RefAttributes<HTMLOListElement>
  > {
  Info: TimelineInfoStepType;
  Status: TimelineStatusStepType;
  Cont: TimelineContStepType;
}

export const Timeline: TimelineComponent = forwardRef<
  HTMLOListElement,
  TimelineProps
>(({ children, className, ...rest }, ref) => {
  return (
    <ul {...rest} ref={ref} className={cl("navds-timeline", className)}>
      {children}
    </ul>
  );
}) as TimelineComponent;

Timeline.Info = InfoStep;
Timeline.Status = StatusStep;
Timeline.Cont = ContStep;

export default Timeline;
