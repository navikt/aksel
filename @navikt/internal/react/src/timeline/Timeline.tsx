import { endOfDay, startOfDay } from "date-fns";
import React, { forwardRef, useMemo } from "react";
import { AxisLabels } from "./AxisLabels";
import { RowContext } from "./hooks/useRowContext";
import { TimelineContext } from "./hooks/useTimelineContext";
import {
  useEarliestDate,
  useLatestDate,
  useTimelineRows,
} from "./hooks/useTimelineRows";
import Period, { PeriodType } from "./period/Period";
import Pin, { PinType } from "./Pin";
import TimelineRow, { TimelineRowType } from "./TimelineRow";
import { parseRows } from "./utils/timeline";
import ZoomButton, { ZoomButtonType } from "./ZoomButton";

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
  /**
   * Built-in timeline pin
   */
  Pin: PinType;
  /**
   * Built-in timeline zoom button
   */
  ZoomButton: ZoomButtonType;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, startDate, endDate, direction = "left", ...rest }, ref) => {
    const isMultipleRows = Array.isArray(children);
    if (!isMultipleRows) {
      children = [children];
    }
    const rowChildren = React.Children.toArray(children).filter(
      (c: any) => c?.type?.componentType === "row"
    );

    const pins = React.Children.toArray(children).filter(
      (c: any) => c?.type?.componentType === "pin"
    );

    const zoomButtons = React.Children.toArray(children).filter(
      (c: any) => c?.type?.componentType === "zoom"
    );

    const rows = useMemo(() => {
      return parseRows(rowChildren);
    }, [rowChildren]);

    const start = startOfDay(useEarliestDate({ startDate, rows }));
    const endInclusive = endOfDay(useLatestDate({ endDate, rows }));
    const processedRows = useTimelineRows(rows, start, endInclusive, direction);

    return (
      <TimelineContext.Provider
        value={{
          startDate: start,
          endDate: endInclusive,
          direction: direction,
        }}
      >
        <div {...rest} ref={ref} className="navdsi-timeline">
          <AxisLabels />

          {pins.map((pin) => {
            return pin;
          })}

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
        {zoomButtons.map((zoom) => {
          return zoom;
        })}
      </TimelineContext.Provider>
    );
  }
) as TimelineComponent;

Timeline.Row = TimelineRow;
Timeline.Period = Period;
Timeline.Pin = Pin;
Timeline.ZoomButton = ZoomButton;

export default Timeline;
