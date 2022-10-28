import React, { forwardRef, ReactNode } from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";
import { position } from "./utils/calc";

export interface PinProps {
  /**
   * Date position for the pin.
   */
  date: Date;
  /**
   * The content for Pin Popover.
   */
  children?: ReactNode;
}

export type PinType = React.ForwardRefExoticComponent<
  PinProps & React.RefAttributes<HTMLSpanElement>
>;

export const Pin = forwardRef<HTMLSpanElement, PinProps>(
  ({ date, children, ...rest }, ref) => {
    const { startDate, endDate, direction } = useTimelineContext();
    return (
      <span
        {...rest}
        ref={ref}
        tabIndex={1}
        className="navdsi-timeline__pin"
        style={{ [direction]: `${position(date, startDate, endDate)}%` }}
      ></span>
    );
  }
);

//@ts-ignore
Pin.componentType = "pin";

export default Pin;
