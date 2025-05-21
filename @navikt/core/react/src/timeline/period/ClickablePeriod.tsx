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
import React, { useRef, useState } from "react";
import { useRenameCSS, useThemeInternal } from "../../theme/Theme";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import { useTimelineContext } from "../hooks/useTimelineContext";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import type { PeriodProps } from "./types";

interface TimelineClickablePeriodProps extends PeriodProps {
  onSelectPeriod?: (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => void;
  isActive?: boolean;
  periodRef: React.ForwardedRef<HTMLButtonElement>;
  /**
   * Default orientation of popover
   * @default "top"
   */
  placement?: "top" | "bottom";
}

const ClickablePeriod = React.memo(
  ({
    onSelectPeriod,
    start,
    end,
    status,
    cropped,
    direction,
    left,
    width,
    icon,
    children,
    isActive,
    statusLabel,
    restProps,
    periodRef,
  }: TimelineClickablePeriodProps) => {
    const { cn } = useRenameCSS();
    const [open, setOpen] = useState(false);
    const { index } = useRowContext();
    const { firstFocus } = usePeriodContext();
    const { initiate, addFocusable } = useTimelineContext();
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const translate = useI18n("Timeline");

    const themeContext = useThemeInternal(false);
    const showArrow = !themeContext;

    const {
      context,
      placement,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
      refs,
      floatingStyles,
    } = useFloating({
      placement: restProps?.placement ?? "top",
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
    const role = useRole(context, { role: "dialog" });

    const { getFloatingProps, getReferenceProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const mergedRef = useMergeRefs(refs.setReference, periodRef);

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    return (
      <>
        <button
          data-color-role={status}
          {...restProps}
          type="button"
          ref={(r) => {
            firstFocus && addFocusable(r, index);
            mergedRef(r);
          }}
          aria-label={ariaLabel(start, end, status, statusLabel, translate)}
          className={cn(
            "navds-timeline__period--clickable",
            getConditionalClasses(cropped, direction, status),
            restProps?.className,
            {
              "navds-timeline__period--selected": isActive,
            },
          )}
          aria-expanded={children ? open : undefined}
          aria-current={isActive || undefined}
          {...getReferenceProps({
            onFocus: () => {
              initiate(index);
            },
            onKeyDown: (e) => {
              restProps?.onKeydown?.(e);
              if (e.key === "Enter") {
                setOpen((prev) => !prev);
              }
              if (e.key === " ") {
                onSelectPeriod?.(e);
                setOpen(false);
              }
            },
            style: {
              width: `${width}%`,
              [direction]: `${left}%`,
            },
            onClick: (e) => {
              restProps?.onClick?.(e);
              if (e.detail === 0) {
                return;
              }
              onSelectPeriod?.(e);
            },
          })}
        >
          <span className={cn("navds-timeline__period--inner")}>{icon}</span>
        </button>
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
);

export default ClickablePeriod;
