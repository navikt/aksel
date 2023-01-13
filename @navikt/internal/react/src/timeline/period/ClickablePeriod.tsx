import { Popover } from "@navikt/ds-react";
import cl from "clsx";
import React, { useRef, useState } from "react";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import { useTimelineContext } from "../hooks/useTimelineContext";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./Period";

interface ClickablePeriodProps extends PeriodProps {
  onSelectPeriod?: () => void;
  isActive?: boolean;
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
  }: ClickablePeriodProps) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [selected, setSelected] = useState(false);
    const { index } = useRowContext();
    const { firstFocus } = usePeriodContext();
    const { initiate, addFocusable } = useTimelineContext();

    return (
      <>
        <button
          ref={(r) => {
            firstFocus && addFocusable(r, index);
            buttonRef.current = r;
          }}
          onClick={() => {
            children && setSelected((x) => !x);
            onSelectPeriod?.();
          }}
          aria-label={ariaLabel(start, end, status, statusLabel)}
          className={cl(
            "navdsi-timeline__period--clickable",
            getConditionalClasses(cropped, direction, status),
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
          >
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        )}
      </>
    );
  }
);

export default ClickablePeriod;
