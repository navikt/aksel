import React, { forwardRef } from "react";
import { AxisLabels } from "./AxisLabels";
import { TimelineContext } from "./hooks/useTimelineContext";
import Period, { PeriodType } from "./Period";
import TimelineRow, { TimelineRowType } from "./TimelineRow";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Decides the startingpoint for the timeline. Defaults to the earliest date among the timeline periods.
   */
  startDate?: Date;
  /**
   Decides the end-date for the timeline. Defaults to the latest date among the timeline periods.
   */
  endDate?: Date;
}

interface TimelineComponent
  extends React.ForwardRefExoticComponent<TimelineProps> {
  /**
   * Built-in timeline row
   */
  Row: TimelineRowType;
  /**
   * Built-in row period
   */
  Period: PeriodType;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, startDate, endDate, ...rest }, ref) => {
    return (
      <TimelineContext.Provider
        value={{
          startDate: startDate || new Date(),
          endDate: endDate || new Date(),
        }}
      >
        <div {...rest} ref={ref} className="navdsi-timeline">
          <AxisLabels start={startDate} end={endDate} />
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
) as TimelineComponent;

Timeline.Row = TimelineRow;
Timeline.Period = Period;

export default Timeline;
