import { format } from "date-fns";
import React, { forwardRef } from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";

type DateRange = {
  from: Date;
  to: Date;
};

export interface ZoomButtonProps {
  /**
   * Button text
   */
  label: string;
  /**
   * Timeline date range when clicking button
   */
  dateRange: DateRange;
}

export type ZoomButtonType = React.ForwardRefExoticComponent<
  ZoomButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export const ZoomButton = forwardRef<HTMLButtonElement, ZoomButtonProps>(
  ({ label, dateRange, ...rest }, ref) => {
    const { setStart, setEndInclusive } = useTimelineContext();

    return (
      <button
        aria-label={`Zoom tidslinjen ${format(
          dateRange.from,
          "dd.MM.yyyy"
        )} til ${format(dateRange.to, "dd.MM.yyyy")}`}
        ref={ref}
        {...rest}
        className="navdsi-timeline__zoom"
        onClick={() => {
          setStart(dateRange.from);
          setEndInclusive(dateRange.to);
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
