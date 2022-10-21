import React, { forwardRef, ReactElement, useMemo } from "react";
import { AxisLabels } from "./AxisLabels";
import { TimelineContext } from "./hooks/useTimelineContext";
import Period, { PeriodType } from "./Period";
import TimelineRow, { TimelineRowType } from "./TimelineRow";
import { getFirstDate, getLastDate } from "./utils/filter";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[];
  /**
   * Decides the startingpoint for the timeline. Defaults to the earliest date among the timeline periods.
   */
  startDate?: Date;
  /**
   Decides the end-date for the timeline. Defaults to the latest date among the timeline periods.
   */
  endDate?: Date;
  /**
   * Decides the direction which the periods are sorted. "Left" equals ascending fro left.
   * @default "left"
   */
  direction?: "left" | "right";
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
  ({ children, startDate, endDate, direction = "left", ...rest }, ref) => {
    const allPeriods = useMemo(() => {
      let periods: any = [];
      for (let i = 0; i < children.length; i++) {
        const row = children[i];

        if (React.isValidElement(row) && row?.props?.children) {
          const isArray = Array.isArray(row?.props?.children);
          if (isArray) {
            const rowPeriods = row?.props?.children.map(
              (period: ReactElement) => {
                return {
                  start: period.props.start,
                  end: period.props.end,
                };
              }
            );
            periods = [...periods, ...rowPeriods];
          } else {
            periods = [...periods, row.props.children];
          }
        }
      }
      return periods;
    }, [children]);

    // const rows = children.map((r) => {
    //   if (React.isValidElement(r) && r?.props?.children) {
    //     let periods = [];
    //     for (let i = 0; i < r.props.children.length; i++) {
    //       const p = r.props.children[i];
    //       periods.push({ start: p?.props?.start, end: p?.props?.end });
    //     }
    //     return periods;
    //   }
    //   return [];
    // });
    // const start = startOfDay(useEarliestDate({ startDate, rows }));
    // const endInclusive = endOfDay(useLatestDate({ endDate, rows }));
    // const processedRows = useTimelineRows(rows, start, endInclusive, direction);

    return (
      <TimelineContext.Provider
        value={{
          startDate: startDate || getFirstDate(allPeriods),
          endDate: endDate || getLastDate(allPeriods),
          periods: allPeriods,
        }}
      >
        <div {...rest} ref={ref} className="navdsi-timeline">
          <AxisLabels />
          {children}
        </div>
      </TimelineContext.Provider>
    );
  }
) as TimelineComponent;

Timeline.Row = TimelineRow;
Timeline.Period = Period;

export default Timeline;
