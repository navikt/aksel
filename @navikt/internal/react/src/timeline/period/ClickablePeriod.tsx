import { mergeRefs, Popover } from "@navikt/ds-react";
import cl from "clsx";
import React, { useMemo, useRef, useState } from "react";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import { useTimelineContext } from "../hooks/useTimelineContext";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./index";

interface TimelineClickablePeriodProps extends PeriodProps {
  onSelectPeriod?: () => void;
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
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [selected, setSelected] = useState(false);
    const { index } = useRowContext();
    const { firstFocus } = usePeriodContext();
    const { initiate, addFocusable } = useTimelineContext();

    const mergedRef = useMemo(
      () => mergeRefs([buttonRef, periodRef]),
      [periodRef]
    );

    return (
      <>
        <button
          {...restProps}
          ref={(r) => {
            firstFocus && addFocusable(r, index);
            mergedRef(r);
          }}
          onClick={() => {
            children && setSelected((x) => !x);
            onSelectPeriod?.();
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
          style={{
            width: `${width}%`,
            [direction]: `${left}%`,
          }}
          aria-expanded={children ? selected : undefined}
          onFocus={() => {
            initiate(index);
          }}
        >
          <div className="navdsi-timeline__period--inner">{icon}</div>
        </button>
        {children && (
          <Popover
            open={selected}
            onClose={() => setSelected(false)}
            anchorEl={buttonRef.current}
            strategy="fixed"
          >
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        )}
      </>
    );
  }
);

export default ClickablePeriod;
