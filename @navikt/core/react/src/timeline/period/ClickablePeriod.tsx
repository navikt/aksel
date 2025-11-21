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
import React, { useState } from "react";
import { useRenameCSS } from "../../theme/Theme";
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

    const translate = useI18n("Timeline");

    const { context, placement, refs, floatingStyles } = useFloating({
      placement: restProps?.placement ?? "top",
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

    const mergedRef = useMergeRefs(refs.setReference, periodRef);

    const label = ariaLabel(start, end, status, statusLabel, translate);

    return (
      <>
        <button
          {...restProps}
          data-color={restProps?.["data-color"] ?? status}
          type="button"
          ref={(r) => {
            firstFocus && addFocusable(r, index);
            mergedRef(r);
          }}
          aria-label={label}
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

export default ClickablePeriod;
