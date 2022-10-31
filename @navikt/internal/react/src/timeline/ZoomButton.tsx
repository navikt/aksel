import { format, subMonths } from "date-fns";
import React, { forwardRef } from "react";
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

export type ZoomButtonType = React.ForwardRefExoticComponent<
  ZoomButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export const ZoomButton = forwardRef<HTMLButtonElement, ZoomButtonProps>(
  ({ label, interval, count, ...rest }, ref) => {
    const { setStart, endDate } = useTimelineContext();
    const startOfRange = subMonths(endDate, count);

    return (
      <button
        aria-label={`Zoom tidslinjen ${format(
          startOfRange,
          "dd.MM.yyyy"
        )} til ${format(endDate, "dd.MM.yyyy")}`}
        ref={ref}
        {...rest}
        className="navdsi-timeline__zoom"
        onClick={() => {
          setStart(startOfRange);
        }}
      >
        {label}
      </button>
    );
  }
);

//@ts-ignore
ZoomButton.componentType = "zoom";

export default ZoomButton;
