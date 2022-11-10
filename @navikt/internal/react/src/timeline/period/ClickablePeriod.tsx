import { Popover } from "@navikt/ds-react";
import cl from "clsx";
import React, { RefObject, useState } from "react";
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

    return (
      <>
        <button
          ref={buttonRef}
          onClick={() => {
            children && setSelected(!selected);
            onSelectPeriod?.();
          }}
          aria-label={ariaLabel(start, end, status, statusLabel)}
          className={cl(getConditionalClasses(cropped, direction, status), {
            "navdsi-timeline__period--selected": isActive,
          })}
          data-clickable
          style={{
            width: `${width}%`,
            [direction]: `${left}%`,
          }}
          aria-expanded={children ? selected : undefined}
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
