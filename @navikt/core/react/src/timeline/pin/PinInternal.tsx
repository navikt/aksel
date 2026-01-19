import {
  FloatingFocusManager,
  autoUpdate,
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
import { format } from "date-fns";
import React, { forwardRef, useState } from "react";
import { useMergeRefs } from "../../utils/hooks";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { useTimelineContext } from "../hooks/useTimelineContext";
import { position } from "../utils/calc";

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

export const PinInternal = forwardRef<HTMLButtonElement, TimelinePinProps>(
  ({ date, children, ...rest }, ref) => {
    const { startDate, endDate, direction } = useTimelineContext();
    const [open, setOpen] = useState(false);

    const translate = useI18n("Timeline");

    const {
      context,
      placement,

      refs,
      floatingStyles,
    } = useFloating({
      placement: "top",
      open,
      onOpenChange: (_open) => setOpen(_open),
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(8),
        shift(),
        flip({ padding: 5, fallbackPlacements: ["bottom", "top"] }),
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

    const { getFloatingProps, getReferenceProps } = useInteractions([
      hover,
      focus,
      dismiss,
    ]);

    const mergedRef = useMergeRefs(refs.setReference, ref);

    const label = translate("Pin.pin", {
      date: format(date, translate("dateFormat")),
    });

    return (
      <>
        <div
          className="aksel-timeline__pin-wrapper"
          style={{ [direction]: `${position(date, startDate, endDate)}%` }}
        >
          <button
            {...rest}
            ref={mergedRef}
            className="aksel-timeline__pin-button"
            aria-label={label}
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
              className="aksel-timeline__popover"
              data-placement={placement}
              ref={refs.setFloating}
              role="dialog"
              aria-label={label}
              {...getFloatingProps()}
              style={floatingStyles}
            >
              {children}
            </div>
          </FloatingFocusManager>
        )}
      </>
    );
  },
);

export default PinInternal;
