import { mergeRefs, Popover } from "@navikt/ds-react";
import { format } from "date-fns";
import React, { forwardRef, ReactNode, useMemo, useRef, useState } from "react";
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

export interface PinType
  extends React.ForwardRefExoticComponent<
    PinProps & React.RefAttributes<HTMLButtonElement>
  > {
  componentType: string;
}

export const Pin = forwardRef<HTMLButtonElement, PinProps>(
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
