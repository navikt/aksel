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
    const [openState, setOpenState] = useState(false);
    console.log(children);
    return (
      <button
        ref={buttonRef}
        onClick={() => {
          setOpenState(!openState);
          onSelectPeriod && onSelectPeriod();
        }}
        aria-label={ariaLabel(start, end, status)}
        className={getConditionalClasses(cropped, direction, status)}
        data-clickable
        style={{
          width: `${width}%`,
          left: `${left}%`,
        }}
      >
        {icon}
        {children && (
          <Popover
            open={openState}
            onClose={() => setOpenState(false)}
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
