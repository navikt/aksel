import { endOfDay, isSameDay, startOfDay } from "date-fns";
import React, { forwardRef, useMemo, useState } from "react";
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

    //TO-DO: Selected period.

    const rows = useMemo(() => {
      return parseRows(rowChildren);
    }, [rowChildren]);

    const initialStartDate = startOfDay(useEarliestDate({ startDate, rows }));

    const [start, setStart] = useState(initialStartDate);
    const [endInclusive, setEndInclusive] = useState(
      endOfDay(useLatestDate({ endDate, rows }))
    );

    const initialEndDate = endOfDay(useLatestDate({ endDate, rows }));
    const processedRows = useTimelineRows(rows, start, endInclusive, direction);

    const handleZoomChange = (zoomStart: Date) => {
      if (direction === "left") {
        if (isSameDay(zoomStart, start)) {
          setStart(initialStartDate);
          return;
        }
        setStart(zoomStart);
      } else {
        if (isSameDay(zoomStart, endInclusive)) {
          setEndInclusive(initialEndDate);
          return;
        }
        setEndInclusive(zoomStart);
      }
    };

    return (
      <TimelineContext.Provider
        value={{
          startDate: start,
          endDate: endInclusive,
          direction: direction,
          setStart: (d) => handleZoomChange(d),
          setEndInclusive: (d) => setEndInclusive(d),
        }}
      >
        <div {...rest} ref={ref} className="navdsi-timeline">
          <AxisLabels />
          <div className="navdsi-timeline__pins">
            {pins.map((pin) => {
              return pin;
            })}
          </div>

          {processedRows.map((row) => {
            return (
              <>
                {row.label && (
                  <span
                    id={`label-${row.id}`}
                    className="navdsi-timeline__row__label"
                  >
                    {row.label}
                  </span>
                )}
                <RowContext.Provider
                  key={`row-${row.id}`}
                  value={{
                    periods: row.periods,
                    id: row.id,
                  }}
                >
                  <TimelineRow label={row.label} />
                </RowContext.Provider>
              </>
            );
          })}
        </div>
        {zoomButtons.length && (
          <div className="navdsi-timeline__zoom">
            {zoomButtons.map((zoom) => {
              return zoom;
            })}
          </div>
        )}
      </TimelineContext.Provider>
    );
  }
) as TimelineComponent;

Timeline.Row = TimelineRow;
Timeline.Period = Period;
Timeline.Pin = Pin;
Timeline.ZoomButton = ZoomButton;

export default Timeline;
