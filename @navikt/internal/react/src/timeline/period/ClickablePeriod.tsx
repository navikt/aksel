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
import { mergeRefs } from "@navikt/ds-react";
import cl from "clsx";
import React, { useMemo, useRef, useState } from "react";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import { useTimelineContext } from "../hooks/useTimelineContext";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./index";

interface TimelineClickablePeriodProps extends PeriodProps {
  onSelectPeriod?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive?: boolean;
  periodRef: React.ForwardedRef<HTMLButtonElement>;
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
    const { index } = useRowContext();
    const { firstFocus } = usePeriodContext();
    const { initiate, addFocusable } = useTimelineContext();
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
      () => mergeRefs([refs.setReference, periodRef]),
      [periodRef, refs.setReference]
    );

    const staticSide = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    }[placement.split("-")[0]];

    return (
      <>
        <button
          {...restProps}
          type="button"
          ref={(r) => {
            firstFocus && addFocusable(r, index);
            mergedRef(r);
          }}
          aria-label={ariaLabel(start, end, status, statusLabel)}
          className={cl(
            "navdsi-timeline__period--clickable",
            getConditionalClasses(cropped, direction, status),
            restProps?.className,
            {
              "navdsi-timeline__period--selected": isActive,
            }
          )}
          aria-expanded={children ? open : undefined}
          {...getReferenceProps({
            onFocus: () => {
              initiate(index);
            },
            style: {
              width: `${width}%`,
              [direction]: `${left}%`,
            },
            onClick: (e) =>
              onSelectPeriod?.(
                e as React.MouseEvent<HTMLButtonElement, MouseEvent>
              ),
          })}
        >
          <span className="navdsi-timeline__period--inner">{icon}</span>
        </button>
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
);

export default ClickablePeriod;
