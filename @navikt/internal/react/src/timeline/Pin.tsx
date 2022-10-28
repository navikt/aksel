import { Popover } from "@navikt/ds-react";
import { format } from "date-fns";
import React, { forwardRef, ReactNode, useRef, useState } from "react";
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
  PinProps & React.RefAttributes<HTMLButtonElement>
>;

export const Pin = forwardRef<HTMLButtonElement, PinProps>(
  ({ date, children, ...rest }, ref) => {
    const { startDate, endDate, direction } = useTimelineContext();
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
      <div
        className="navdsi-timeline__pin__wrapper"
        style={{ [direction]: `${position(date, startDate, endDate)}%` }}
      >
        <button
          {...rest}
          ref={buttonRef}
          className="navdsi-timeline__pin__button"
          onClick={() => setOpen(!open)}
          tabIndex={1}
          aria-label={`pin:${format(date, "dd.MM.yyyy")}`}
        />
        {children && (
          <Popover
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={buttonRef.current}
          >
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        )}
      </div>
    );
  }
);

//@ts-ignore
Pin.componentType = "pin";

export default Pin;
