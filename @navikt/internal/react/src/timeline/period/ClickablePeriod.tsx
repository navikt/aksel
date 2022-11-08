import { Popover } from "@navikt/ds-react";
import React, { RefObject, useEffect, useState } from "react";
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
  }: ClickablePeriodProps) => {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
      isActive && buttonRef.current?.focus();
    }, [isActive, buttonRef]);

    return (
      <>
        <button
          ref={buttonRef}
          onClick={() => {
            onSelectPeriod?.();
          }}
          aria-label={ariaLabel(start, end, status)}
          className={cl(getConditionalClasses(cropped, direction, status),{"navdsi-timeline__period--selected": isActive})}
          data-clickable
          onMouseEnter={() => {
            setSelected(true);
          }}
          onMouseLeave={() => {
            setSelected(false);
          }}
          style={{
            width: `${width}%`,
            [direction]: `${left}%`,
          }}
          onFocus={() => setSelected(true)}
          aria-expanded={selected}
        >
          {icon}
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
