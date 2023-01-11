import { Popover } from "@navikt/ds-react";
import cl from "clsx";
import React, { RefObject, useEffect, useState } from "react";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import { useTimelineContext } from "../hooks/useTimelineContext";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./Period";

interface ClickablePeriodProps extends PeriodProps {
  buttonRef: RefObject<HTMLButtonElement>;
  onSelectPeriod?: () => void;
  isActive?: boolean;
}

const ClickablePeriod = React.memo(
  ({
    buttonRef,
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
    const [selected, setSelected] = useState(false);
    const { active, index } = useRowContext();
    const { firstFocus } = usePeriodContext();
    const { activeRow, initiate } = useTimelineContext();

    useEffect(() => {
      active && firstFocus && buttonRef.current?.focus();
    }, [active, buttonRef, firstFocus]);

    return (
      <>
        <button
          ref={buttonRef}
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
            !activeRow && initiate(index);
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
