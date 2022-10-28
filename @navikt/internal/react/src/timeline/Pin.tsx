import React, { forwardRef, ReactNode } from "react";

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
    return (
      <span {...rest} ref={ref} className="navdsi-timeline__row">
        {children}
      </span>
    );
  }
);

//@ts-ignore
Pin.componentType = "pin";

export default Pin;
