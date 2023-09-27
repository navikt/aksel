import {
  FloatingFocusManager,
  autoUpdate,
  arrow as flArrow,
  flip,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { format } from "date-fns";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { mergeRefs } from "../util";
import { useTimelineContext } from "./hooks/useTimelineContext";
import { position } from "./utils/calc";
import { TimelineComponentTypes } from "./utils/types.internal";

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
  ({ date, children, ...rest }, ref) => {
    const { startDate, endDate, direction } = useTimelineContext();
    const [open, setOpen] = useState(false);
    const arrowRef = useRef<HTMLDivElement | null>(null);

    const {
      context,
      placement,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
      refs,
      floatingStyles,
    } = useFloating({
      placement: "top",
      open,
      onOpenChange: (_open) => setOpen(_open),
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(16),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        flArrow({ element: arrowRef, padding: 5 }),
      ],
    });

    const hover = useHover(context, {
      handleClose: safePolygon(),
      restMs: 25,
      delay: { open: 1000 },
      move: false,
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "dialog" });

    const { getFloatingProps, getReferenceProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const mergedRef = useMemo(
      () => mergeRefs([refs.setReference, ref]),
      [ref, refs.setReference]
    );

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    return (
      <>
        <div
          className="navds-timeline__pin-wrapper"
          style={{ [direction]: `${position(date, startDate, endDate)}%` }}
        >
          <button
            {...rest}
            ref={mergedRef}
            className="navds-timeline__pin-button"
            aria-label={`pin:${format(date, "dd.MM.yyyy")}`}
            type="button"
            aria-expanded={children ? open : undefined}
            {...getReferenceProps({
              onKeyDown: (e) => {
                rest?.onKeyDown?.(e as React.KeyboardEvent<HTMLButtonElement>);
                if (e.key === "Enter") {
                  setOpen((prev) => !prev);
                } else if (e.key === " ") {
                  setOpen(false);
                }
              },
            })}
          />
        </div>
        {children && open && (
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            returnFocus={false}
          >
            <div
              className="navds-timeline__popover"
              data-placement={placement}
              ref={refs.setFloating}
              {...getFloatingProps()}
              tabIndex={undefined}
              style={floatingStyles}
            >
              {children}
              <div
                ref={arrowRef}
                style={{
                  ...(arrowX != null ? { left: arrowX } : {}),
                  ...(arrowY != null ? { top: arrowY } : {}),
                  ...(staticSide ? { [staticSide]: "-0.5rem" } : {}),
                }}
                className="navds-timeline__popover-arrow"
              />
            </div>
          </FloatingFocusManager>
        )}
      </>
    );
  }
) as PinType;

Pin.componentType = "pin";

export default Pin;
