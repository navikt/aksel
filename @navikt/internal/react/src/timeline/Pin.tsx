import {
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
} from "@floating-ui/react";
import { mergeRefs, useEventListener } from "@navikt/ds-react";
import { format } from "date-fns";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
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
      open: open,
      onOpenChange: setOpen,
      middleware: [
        offset(16),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
        flArrow({ element: arrowRef, padding: 5 }),
      ],
      whileElementsMounted: autoUpdate,
    });

    const { getFloatingProps, getReferenceProps } = useInteractions([
      useHover(context, {
        handleClose: safePolygon(),
        restMs: 25,
        delay: { open: 1000 },
      }),
      useFocus(context),
      useDismiss(context),
    ]);

    const mergedRef = useMemo(
      () => mergeRefs([refs.setReference, ref]),
      [ref, refs.setReference]
    );

    useEventListener(
      "focusin",
      useCallback(
        (e: FocusEvent) => {
          if (
            ![refs.domReference.current, refs?.floating?.current].some(
              (element) => element?.contains(e.target as Node)
            )
          ) {
            open && setOpen(false);
          }
        },
        [open, refs.domReference, refs?.floating]
      )
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
          className="navdsi-timeline__pin-wrapper"
          style={{ [direction]: `${position(date, startDate, endDate)}%` }}
        >
          <button
            {...rest}
            ref={mergedRef}
            className="navdsi-timeline__pin-button"
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
        {children && (
          <div
            className="navds-timeline__popover"
            data-placement={placement}
            aria-hidden={!open}
            ref={refs.setFloating}
            {...getFloatingProps({
              tabIndex: -1,
            })}
            style={{
              ...floatingStyles,
              display: open ? undefined : "none",
            }}
          >
            <div className="navds-timeline__popover-content">{children}</div>
            <div
              ref={(node) => {
                arrowRef.current = node;
              }}
              style={{
                ...(arrowX != null ? { left: arrowX } : {}),
                ...(arrowY != null ? { top: arrowY } : {}),
                ...(staticSide ? { [staticSide]: "-0.5rem" } : {}),
              }}
              className="navds-timeline__popover-arrow"
            />
          </div>
        )}
      </>
    );
  }
) as PinType;

Pin.componentType = "pin";

export default Pin;
