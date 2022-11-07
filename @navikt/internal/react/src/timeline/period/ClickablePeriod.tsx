import { Popover } from "@navikt/ds-react";
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
  }: ClickablePeriodProps) => {
    const [selected, setSelected] = useState(false);

    return (
      <>
        <button
          ref={buttonRef}
          onClick={() => {
            setSelected(!selected);
            onSelectPeriod && onSelectPeriod();
          }}
          aria-label={ariaLabel(start, end, status)}
          className={`${
            isActive && "navdsi-timeline__period--selected"
          } ${getConditionalClasses(cropped, direction, status)}`}
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
