import {
  addMonths,
  addYears,
  format,
  isSameDay,
  subMonths,
  subYears,
} from "date-fns";
import React, { forwardRef, useState } from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";

export interface ZoomButtonProps {
  /**
   * Button text
   */
  label: string;
  /**
   * If the zoom value should be in months or years
   */
  interval: "month" | "year";
  /**
   * How many units of the interval that will be applied
   */
  count: number;
}

export interface ZoomButtonType
  extends React.ForwardRefExoticComponent<
    ZoomButtonProps & React.RefAttributes<HTMLButtonElement>
  > {
  componentType: string;
}

export const ZoomButton = forwardRef<HTMLButtonElement, ZoomButtonProps>(
  ({ label, interval, count, ...rest }, ref) => {
    const { setStart, endDate, startDate, direction } = useTimelineContext();
    let startOfRange: Date;
    const [focused, setFocused] = useState(false);

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
      <li data-focused={focused}>
        <button
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
          className="navdsi-timeline__zoom__button"
          onClick={() => {
            setStart(startOfRange);
          }}
          aria-pressed={currentZoom}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        >
          {label}
        </button>
      </li>
    );
  }
) as ZoomButtonType;

ZoomButton.componentType = "zoom";

export default ZoomButton;
