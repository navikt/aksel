import { isBefore } from "date-fns";
import React, { forwardRef } from "react";
import { useTimelineContext } from "../root/TimelineRoot.context";
import {
  TimelinePinInternal,
  type TimelinePinProps,
} from "./TimelinePinInternal";

const TimelinePinBase = forwardRef<HTMLButtonElement, TimelinePinProps>(
  ({ date, ...restProps }, forwardedRef) => {
    const { startDate, endDate } = useTimelineContext();

    /**
     * Out-of-bounds pins should not be rendered
     */
    if (isBefore(date, startDate) || isBefore(endDate, date)) {
      return null;
    }

    return (
      <TimelinePinInternal ref={forwardedRef} {...restProps} date={date} />
    );
  },
);

const TimelinePin = Object.assign(TimelinePinBase, {
  componentType: "pin" as const,
});

export { TimelinePin };
export type { TimelinePinProps };
