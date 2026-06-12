import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import React, { useState } from "react";
import { cl } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { useI18n } from "../../utils/i18n/i18n.hooks";
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
    const [open, setOpen] = useState(false);

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
    const click = useClick(context);

    const { getFloatingProps, getReferenceProps } = useInteractions([
      click,
      hover,
      focus,
      dismiss,
    ]);

    const mergedRef = useMergeRefs(refs.setReference, periodRef);

    const label = ariaLabel(start, end, status, statusLabel, translate);

    return (
      <>
        <button
          data-timeline-period
          {...restProps}
          data-color={restProps?.["data-color"] ?? status}
          type="button"
          ref={mergedRef}
          aria-label={label}
          className={cl(
            "aksel-timeline__period--clickable",
            getConditionalClasses(cropped, direction, status),
            restProps?.className,
            {
              "aksel-timeline__period--selected": isActive,
            },
          )}
          aria-expanded={children ? open : undefined}
          aria-current={isActive || undefined}
          {...getReferenceProps({
            onKeyDown: (e) => {
              restProps?.onKeyDown?.(e);
              if (e.key === " ") {
                onSelectPeriod?.(e);
              }
            },
            style: {
              width: `${width.toFixed(3)}%`,
              [direction]: `${left.toFixed(3)}%`,
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
          <span className="aksel-timeline__period--inner">{icon}</span>
        </button>
        {children && open && (
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            returnFocus
          >
            <div
              className="aksel-timeline__popover"
              data-timeline-popover
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
