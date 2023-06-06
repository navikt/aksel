import { endOfDay, isSameDay, startOfDay } from "date-fns";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { AxisLabels } from "./AxisLabels";
import { RowContext } from "./hooks/useRowContext";
import { TimelineContext } from "./hooks/useTimelineContext";
import {
  useEarliestDate,
  useLatestDate,
  useTimelineRows,
} from "./hooks/useTimelineRows";
import Period, { PeriodType } from "./period";
import Pin, { PinType } from "./Pin";
import TimelineRow, { TimelineRowType } from "./TimelineRow";
import { parseRows } from "./utils/timeline";
import Zoom, { ZoomType } from "./zoom";

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Decides startingpoint in timeline.
   * Defaults to earliest date among the timeline periods.
   * @note Using this disables use of ZoomButtons. You will need to control zooming yourself.
   */
  startDate?: Date;
  /**
   * Decides end-date for timeline.
   * Defaults to the latest date among the timeline periods.
   * @note Using this disables use of ZoomButtons. You will need to control zooming yourself.
   */
  endDate?: Date;
  /**
   * Decides direction which periods are sorted/displayed. "left" ascends from earliest date on left.
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
   * Built-in timeline zoom-component
   */
  Zoom: ZoomType;
}

/**
 * A component that displays a timeline of events.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/timeline)
 * @see 🏷️ {@link TimelineProps}
 *
 * @example
 * ```jsx
 * <Timeline>
 *   <Timeline.Row>
 *    <Timeline.Period start={new Date("2020-01-01")} end={new Date("2020-01-31")}>
 *    <p>Period 1</p>
 *   </Timeline.Period>
 *  <Timeline.Row>
 * </Timeline>
 * ```
 */
export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ children, startDate, endDate, direction = "left", ...rest }, ref) => {
    const isMultipleRows = Array.isArray(children);

    const firstFocusabled = useRef<
      { ref: HTMLButtonElement | null; id: number }[]
    >([]);

    if (!isMultipleRows) {
      children = [children];
    }
    const rowChildren = React.Children.toArray(children).filter(
      (c: any) => c?.type?.componentType === "row"
    );

    const pins = React.Children.toArray(children).filter(
      (c: any) => c?.type?.componentType === "pin"
    );

    const zoomComponent = React.Children.toArray(children).find(
      (c: any) => c?.type?.componentType === "zoom"
    );

    const rowsRaw = useMemo(() => {
      return parseRows(rowChildren);
    }, [rowChildren]);

    const rows = rowsRaw.map((r) => {
      if (r?.periods) {
        return r.periods;
      }
      return [];
    });

    const initialStartDate = startOfDay(useEarliestDate({ startDate, rows }));
    const [start, setStart] = useState(initialStartDate);
    const [activeRow, setActiveRow] = useState<number | null>(null);
    const [endInclusive, setEndInclusive] = useState(
      endOfDay(useLatestDate({ endDate, rows }))
    );

    const initialEndDate = endOfDay(useLatestDate({ endDate, rows }));
    const processedRows = useTimelineRows(
      rowsRaw,
      startDate ?? start,
      endDate ?? endInclusive,
      direction
    );

    const handleZoomChange = (zoomStart: Date) => {
      if (startDate || endDate) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            "Zooming is not supported when startDate or endDate is set"
          );
        }
        return;
      }
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

    const handleActiveRowChange = (key: string) => {
      if (activeRow !== null && key === "ArrowDown") {
        for (let i = activeRow + 1; i < processedRows.length; i++) {
          const row = processedRows[i];
          if (row.periods.find((p) => !!p.children || !!p.onSelectPeriod)) {
            setActiveRow(i);
            firstFocusabled.current.find((x) => x.id === i)?.ref?.focus();
            break;
          }
        }
        return;
      }
      if (activeRow !== null && key === "ArrowUp") {
        for (let i = activeRow - 1; i >= 0; i--) {
          const row = processedRows[i];
          if (row.periods.find((p) => !!p.children || !!p.onSelectPeriod)) {
            setActiveRow(i);
            firstFocusabled.current.find((x) => x.id === i)?.ref?.focus();
            break;
          }
        }
        return;
      }
    };

    const addFocusable = (ref: HTMLButtonElement | null, id: number) => {
      let items = firstFocusabled.current;
      items = items.filter((x) => x.id !== id);
      items.push({ ref, id });
      firstFocusabled.current = items;
    };

    return (
      <TimelineContext.Provider
        value={{
          startDate: startDate ?? start,
          endDate: endDate ?? endInclusive,
          direction: direction,
          setStart: (d) => handleZoomChange(d),
          setEndInclusive: (d) => setEndInclusive(d),
          activeRow: activeRow,
          setActiveRow: (key) => handleActiveRowChange(key),
          initiate: (i) => setActiveRow(i),
          addFocusable,
        }}
      >
        <div {...rest} ref={ref}>
          <div className="navds-timeline">
            <AxisLabels />

            {pins.map((pin) => {
              return pin;
            })}

            {processedRows.map((row, i) => {
              return (
                <RowContext.Provider
                  key={`row-${row.id}`}
                  value={{
                    periods: row.periods,
                    id: row.id,
                    active: activeRow === i,
                    index: i,
                  }}
                >
                  <TimelineRow
                    {...row?.restProps}
                    ref={row?.ref}
                    label={row.label}
                    icon={row.icon}
                    headingTag={row.headingTag}
                  />
                </RowContext.Provider>
              );
            })}
          </div>
          {zoomComponent && zoomComponent}
        </div>
      </TimelineContext.Provider>
    );
  }
) as TimelineComponent;

Timeline.Row = TimelineRow;
Timeline.Period = Period;
Timeline.Pin = Pin;
Timeline.Zoom = Zoom;

export default Timeline;
