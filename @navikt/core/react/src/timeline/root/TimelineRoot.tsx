import { endOfDay } from "date-fns/endOfDay";
import { isSameDay } from "date-fns/isSameDay";
import { startOfDay } from "date-fns/startOfDay";
import React, { forwardRef, useMemo, useState } from "react";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import { TimelineAxisLabelsInternal } from "../axis-labels/TimelineAxisLabelsInternal";
import {
  TimelinePeriod,
  type TimelinePeriodProps,
} from "../period/TimelinePeriod";
import { TimelinePin, type TimelinePinProps } from "../pin/TimelinePin";
import { TimelineRow, type TimelineRowProps } from "../row/TimelineRow";
import { RowContext } from "../row/TimelineRow.context";
import { parseRows } from "../utils/timeline";
import type { AxisLabelTemplates } from "../utils/types.external";
import {
  TimelineZoomButton,
  type TimelineZoomButtonProps,
} from "../zoom-button/TimelineZoomButton";
import { TimelineZoom, type TimelineZoomProps } from "../zoom/TimelineZoom";
import { TimelineKeyboardNavProvider } from "./TimelineKeyboardNavProvider";
import { TimelineContext } from "./TimelineRoot.context";
import {
  useEarliestDate,
  useLatestDate,
  useTimelineRows,
} from "./useTimelineRows";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Decides startingpoint in timeline.
   * Defaults to earliest date among the timeline periods.
   *
   * Using this disables use of ZoomButtons. You will need to control zooming yourself.
   */
  startDate?: Date;
  /**
   * Decides end-date for timeline.
   * Defaults to the latest date among the timeline periods.
   *
   * Using this disables use of ZoomButtons. You will need to control zooming yourself.
   */
  endDate?: Date;
  /**
   * Decides direction which periods are sorted/displayed. "left" ascends from earliest date on left.
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Templates for label texts. The templates are passed to the date-fns `format` function.
   * Defaults to { day: "dd.MM", month: "MMM yy", year: "yyyy" }.
   * @deprecated Use `<Provider />`-component
   */
  axisLabelTemplates?: AxisLabelTemplates;
}

const TimelineRoot = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      children,
      startDate,
      endDate,
      direction = "left",
      axisLabelTemplates,
      ...rest
    },
    forwardedRef,
  ) => {
    const childArray = useMemo(
      () =>
        React.Children.toArray(Array.isArray(children) ? children : [children]),
      [children],
    );

    const rowChildren = useMemo(() => {
      return childArray.filter((c: any) => c?.type?.componentType === "row");
    }, [childArray]);

    const pins = useMemo(
      () =>
        childArray
          .filter((c: any) => c?.type?.componentType === "pin")
          .map((pinChild: any) => ({
            key: String(pinChild.key ?? pinChild.props.date?.toISOString?.()),
            PinChild: () => pinChild,
          })),
      [childArray],
    );

    const zoomComponent = useMemo(
      () => childArray.find((c: any) => c?.type?.componentType === "zoom"),
      [childArray],
    );

    const rowsRaw = useMemo(() => {
      return parseRows(rowChildren);
    }, [rowChildren]);

    const rows = useMemo(
      () =>
        rowsRaw.map((r) => {
          if (r?.periods) {
            return r.periods;
          }
          return [];
        }),
      [rowsRaw],
    );

    const initialStartDate = startOfDay(useEarliestDate({ startDate, rows }));
    const [start, setStart] = useState(initialStartDate);
    const [endInclusive, setEndInclusive] = useState(
      endOfDay(useLatestDate({ endDate, rows })),
    );

    const initialEndDate = endOfDay(useLatestDate({ endDate, rows }));
    const processedRows = useTimelineRows(
      rowsRaw,
      startDate ?? start,
      endDate ?? endInclusive,
      direction,
    );

    const handleZoomChange = (zoomStart: Date) => {
      if (startDate || endDate) {
        consoleWarning(
          "<Timeline />: Zooming is not supported when `startDate` or `endDate` is set",
        );
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

    return (
      <TimelineContext.Provider
        value={{
          startDate: startDate ?? start,
          endDate: endDate ?? endInclusive,
          direction,
          setStart: (d) => handleZoomChange(d),
          setEndInclusive: (d) => setEndInclusive(d),
        }}
      >
        <TimelineKeyboardNavProvider>
          <div {...rest} ref={forwardedRef}>
            <div className="aksel-timeline">
              <TimelineAxisLabelsInternal templates={axisLabelTemplates} />

              {pins.map(({ key, PinChild }) => (
                <PinChild key={key} />
              ))}

              {processedRows.map((row, i) => {
                return (
                  <RowContext.Provider
                    key={`row-${row.id}`}
                    value={{
                      periods: row.periods,
                      id: row.id,
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
            {zoomComponent}
          </div>
        </TimelineKeyboardNavProvider>
      </TimelineContext.Provider>
    );
  },
);

/**
 * A component that displays a timeline of events. Meant for Internal systems.
 *
 * Component is made for desktop enviroments and will start having issues on smaller screens.
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
const Timeline = Object.assign(TimelineRoot, {
  /**
   * @see 🏷️ {@link TimelineRowProps}
   */
  Row: TimelineRow,
  /**
   * @see 🏷️ {@link TimelinePeriodProps}
   */
  Period: TimelinePeriod,
  /**
   * @see 🏷️ {@link TimelinePinProps}
   */
  Pin: TimelinePin,
  /**
   * @see 🏷️ {@link TimelineZoomProps}
   */
  Zoom: TimelineZoom,
});

export {
  Timeline,
  TimelinePeriod,
  TimelinePin,
  TimelineRow,
  TimelineZoomButton,
};
export type {
  TimelinePeriodProps,
  TimelinePinProps,
  TimelineProps,
  TimelineRowProps,
  TimelineZoomButtonProps,
  TimelineZoomProps,
};
