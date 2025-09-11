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
} from "@floating-ui/react";
import { format } from "date-fns";
import React, { forwardRef, useRef, useState } from "react";
import { useRenameCSS, useThemeInternal } from "../theme/Theme";
import { useMergeRefs } from "../util/hooks/useMergeRefs";
import { useI18n } from "../util/i18n/i18n.hooks";
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
    const { cn } = useRenameCSS();
    const { startDate, endDate, direction } = useTimelineContext();
    const [open, setOpen] = useState(false);
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const translate = useI18n("Timeline");

    const themeContext = useThemeInternal(false);
    const showArrow = !themeContext?.isDarkside;

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
        offset(showArrow ? 16 : 8),
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

    const { getFloatingProps, getReferenceProps } = useInteractions([
      hover,
      focus,
      dismiss,
    ]);

    const mergedRef = useMergeRefs(refs.setReference, ref);

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    return (
      <>
        <div
          className={cn("navds-timeline__pin-wrapper")}
          style={{ [direction]: `${position(date, startDate, endDate)}%` }}
        >
          <button
            {...rest}
            ref={mergedRef}
            className={cn("navds-timeline__pin-button")}
            aria-label={translate("Pin.pin", {
              date: format(date, translate("dateFormat")),
            })}
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
              className={cn("navds-timeline__popover")}
              data-placement={placement}
              ref={refs.setFloating}
              role="dialog"
              {...getFloatingProps()}
              style={floatingStyles}
            >
              {children}
              {showArrow && (
                <div
                  ref={arrowRef}
                  style={{
                    ...(arrowX != null ? { left: arrowX } : {}),
                    ...(arrowY != null ? { top: arrowY } : {}),
                    ...(staticSide ? { [staticSide]: "-0.5rem" } : {}),
                  }}
                  className={cn("navds-timeline__popover-arrow")}
                />
              )}
            </div>
          </FloatingFocusManager>
        )}
      </>
    );
  },
) as PinType;

Pin.componentType = "pin";

export default Pin;
