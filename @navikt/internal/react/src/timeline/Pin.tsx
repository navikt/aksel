import { mergeRefs, Popover } from "@navikt/ds-react";
import { format } from "date-fns";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";
import { position } from "./utils/calc";
import { TimelineComponentTypes } from "./utils/types.internal";

export interface TimelinePinProps {
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
  ({ date, children, ...rest }, ref) => {
    const { startDate, endDate, direction } = useTimelineContext();
    const [open, setOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([buttonRef, ref]), [ref]);

    return (
      <>
        <div
          className="navdsi-timeline__pin-wrapper"
          style={{ [direction]: `${position(date, startDate, endDate)}%` }}
        >
          <button
            {...rest}
            ref={mergedRef}
            className="navdsi-timeline__pin-button"
            onClick={() => setOpen(!open)}
            aria-label={`pin:${format(date, "dd.MM.yyyy")}`}
            aria-expanded={open}
            type="button"
          />
        </div>
        {children && (
          <Popover
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={buttonRef.current}
            offset={18}
          >
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        )}
      </>
    );
  }
) as PinType;

Pin.componentType = "pin";

export default Pin;
