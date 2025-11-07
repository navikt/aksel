import { isBefore } from "date-fns";
import React, { forwardRef } from "react";
import { useTimelineContext } from "../hooks/useTimelineContext";
import { TimelineComponentTypes } from "../utils/types.internal";
import PinInternal from "./PinInternal";

export interface TimelinePinProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Date position for the pin.
   */
  date: Date;
  /**
   * Content in Pin Popover.
   */
  children?: React.ReactNode;
}

export interface PinType
  extends React.ForwardRefExoticComponent<
    TimelinePinProps & React.RefAttributes<HTMLButtonElement>
  > {
  componentType: TimelineComponentTypes;
}

export const Pin = forwardRef<HTMLButtonElement, TimelinePinProps>(
  ({ date, ...restProps }, forwardedRef) => {
    const { startDate, endDate } = useTimelineContext();

    /**
     * Out-of-bounds pins should not be rendered
     */
    if (isBefore(date, startDate) || isBefore(endDate, date)) {
      return null;
    }

    return <PinInternal ref={forwardedRef} {...restProps} date={date} />;
  },
) as PinType;

Pin.componentType = "pin";

export default Pin;
