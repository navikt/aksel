import { Popover } from "@navikt/ds-react";
import React, { RefObject, useState } from "react";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./Period";

interface ClickablePeriodProps extends PeriodProps {
  buttonRef: RefObject<HTMLButtonElement>;
  onSelectPeriod?: () => void;
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
  }: ClickablePeriodProps) => {
    const [selected, setSelected] = useState(false);
    return (
      <button
        ref={buttonRef}
        onClick={() => {
          setSelected(!selected);
          onSelectPeriod && onSelectPeriod();
        }}
        aria-label={ariaLabel(start, end, status)}
        className={`${
          selected && "navdsi-timeline__period--selected"
        } ${getConditionalClasses(cropped, direction, status)}`}
        data-clickable
        style={{
          width: `${width}%`,
          [direction]: `${left}%`,
        }}
      >
        {icon}
        {children && (
          <Popover
            open={selected}
            onClose={() => setSelected(false)}
            anchorEl={buttonRef.current}
          >
            <Popover.Content>{children}</Popover.Content>
          </Popover>
        )}
      </button>
    );
  }
);

export default ClickablePeriod;
