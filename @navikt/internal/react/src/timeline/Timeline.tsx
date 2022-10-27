import { endOfDay, startOfDay } from "date-fns";
import React, { forwardRef, ReactNode } from "react";
import { AxisLabels } from "./AxisLabels";
import { RowContext } from "./hooks/useRowContext";
import { TimelineContext } from "./hooks/useTimelineContext";
import {
  useEarliestDate,
  useLatestDate,
  useTimelineRows,
} from "./hooks/useTimelineRows";
import Period, { PeriodType } from "./period/Period";
import TimelineRow, { TimelineRowType } from "./TimelineRow";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactNode[];
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
    const isMultipleRows = Array.isArray(children);
    if (!isMultipleRows) {
      children = [children];
    }

    //@ts-ignore
    const rows = children?.map((r: ReactNode) => {
      let periods = [];
      if (React.isValidElement(r) && r?.props?.children) {
        if (Array.isArray(r.props.children)) {
          for (let i = 0; i < r.props.children.length; i++) {
            const p = r.props.children[i];

            periods.push({
              start: p?.props?.start,
              end: p?.props?.end,
              status: p?.props?.status || "default",
              onSelectPeriod: p.props?.onSelectPeriod,
              label: r.props.label,
              icon: p.props.icon,
              children: p.props.children,
            });
          }
        } else {
          periods.push({
            start: r.props.children.props.start,
            end: r.props.children.props.end,
            status: r.props.children.props?.status || "default",
            onSelectPeriod: r.props.children.props?.onSelectPeriod,
            label: r.props.label,
            icon: r.props.children.props?.icon,
            children: r.props.children.props?.children,
          });
        }
        return periods;
      }
      return [];
    });

    const start = startOfDay(useEarliestDate({ startDate, rows }));
    const endInclusive = endOfDay(useLatestDate({ endDate, rows }));
    const processedRows = useTimelineRows(rows, start, endInclusive, direction);

    return (
      <TimelineContext.Provider
        value={{
          startDate: start,
          endDate: endInclusive,
        }}
      >
        <div {...rest} ref={ref} className="navdsi-timeline">
          <AxisLabels />

          {processedRows.map((row) => {
            return (
              <RowContext.Provider
                key={`row-${row.id}`}
                value={{
                  periods: row.periods,
                }}
              >
                <TimelineRow label={row.label} />
              </RowContext.Provider>
            );
          })}
        </div>
      </TimelineContext.Provider>
    );
  }
) as TimelineComponent;

Timeline.Row = TimelineRow;
Timeline.Period = Period;

export default Timeline;
