import React, { forwardRef } from "react";
import { AxisLabels } from "./AxisLabels";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * Decides the startingpoint for the timeline. Defaults to the earliest date among the timeline periods.
   */
  startDate?: Date;
  /**
   Decides the end-date for the timeline. Defaults to the latest date among the timeline periods.
   */
  endDate?: Date;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, startDate, endDate, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className="navdsi-timeline">
        <AxisLabels start={startDate} end={endDate} />
        {children}
      </div>
    );
  }
);

export default Timeline;
