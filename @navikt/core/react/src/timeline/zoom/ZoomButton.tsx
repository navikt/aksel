import { Detail } from "../../typography/Detail";
import {
  addMonths,
  addYears,
  format,
  isSameDay,
  subMonths,
  subYears,
} from "date-fns";
import React, { forwardRef } from "react";
import { useTimelineContext } from "../hooks/useTimelineContext";

export interface TimelineZoomButtonProps {
  /**
   * e.g 3mnd, 6mnd etc
   */
  label: string;
  /**
   * Zoom interval in months or years
   */
  interval: "month" | "year";
  /**
   * How many units of the interval that will be applied
   * e.g interval="month" + count={3} equals 3 months
   */
  count: number;
}

export type ZoomButtonType = React.ForwardRefExoticComponent<
  TimelineZoomButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export const ZoomButton: ZoomButtonType = forwardRef(
  ({ label, interval, count, ...rest }, ref) => {
    const { setStart, endDate, startDate, direction } = useTimelineContext();

    let startOfRange: Date;

    if (interval === "month") {
      startOfRange =
        direction === "left"
          ? subMonths(endDate, count)
          : addMonths(startDate, count);
    } else {
      startOfRange =
        direction === "left"
          ? subYears(endDate, count)
          : addYears(startDate, count);
    }

    const currentZoom =
      direction === "left"
        ? isSameDay(startDate, startOfRange)
        : isSameDay(endDate, startOfRange);

    return (
      <Detail as="li">
        <button
          type="button"
          aria-label={
            !currentZoom
              ? `Zoom tidslinjen ${format(
                  startOfRange,
                  "dd.MM.yyyy"
                )} til ${format(endDate, "dd.MM.yyyy")}`
              : "Tilbakestill til initiell tidsperspektiv"
          }
          ref={ref}
          {...rest}
          className="navds-timeline__zoom-button"
          onClick={() => {
            setStart(startOfRange);
          }}
          aria-pressed={currentZoom}
        >
          {label}
        </button>
      </Detail>
    );
  }
);

export default ZoomButton;
