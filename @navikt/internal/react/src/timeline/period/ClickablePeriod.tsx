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
import { Popover, mergeRefs } from "@navikt/ds-react";
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
    const [selected, setSelected] = useState(false);
    const { index } = useRowContext();
    const { firstFocus } = usePeriodContext();
    const { initiate, addFocusable } = useTimelineContext();
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const [clicked, setClicked] = useState(false);

    const {
      x,
      y,
      strategy,
      context,
      placement,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
      refs,
      floatingStyles,
    } = useFloating({
      placement: "top",
      open: selected,
      onOpenChange: (open) => {
        setSelected(open);
        setClicked(false);
      },
      middleware: [
        offset(10),
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
        enabled: !clicked,
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
          aria-expanded={children ? selected : undefined}
          {...getReferenceProps({
            onFocus: () => {
              initiate(index);
            },
            style: {
              width: `${width}%`,
              [direction]: `${left}%`,
            },
            onClick: (e) => {
              children && setClicked(true);
              children && setSelected((x) => !x);
              onSelectPeriod?.(
                e as React.MouseEvent<HTMLButtonElement, MouseEvent>
              );
            },
          })}
        >
          <span className="navdsi-timeline__period--inner">{icon}</span>
        </button>
        {children && (
          <div
            className={cl("navds-popover", {
              "navds-popover--hidden": !selected,
            })}
            data-placement={placement}
            aria-hidden={selected}
            ref={refs.setFloating}
            {...getFloatingProps({
              tabIndex: -1,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              },
            })}
            style={floatingStyles}
          >
            <Popover.Content>{children}</Popover.Content>
            <div
              ref={(node) => {
                arrowRef.current = node;
              }}
              style={{
                ...(arrowX != null ? { left: arrowX } : {}),
                ...(arrowY != null ? { top: arrowY } : {}),
                ...(staticSide ? { [staticSide]: "-0.5rem" } : {}),
              }}
              className="navds-popover__arrow"
            />
          </div>
        )}
        {/* {children && (
          <Popover
            open={selected}
            onClose={() => setSelected(false)}
            anchorEl={buttonRef.current}
            strategy="fixed"
          >
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        )} */}
      </>
    );
  }
);

export default ClickablePeriod;
