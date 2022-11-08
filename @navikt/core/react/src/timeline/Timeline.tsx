import cl from "clsx";
import React, { forwardRef } from "react";
import TimelineStep, { TimelineStepType } from "./TimelineStep";

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
  Step: TimelineStepType;
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

Timeline.Step = TimelineStep;

export default Timeline;
