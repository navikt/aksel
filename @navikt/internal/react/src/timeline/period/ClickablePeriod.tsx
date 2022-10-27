import React, { RefObject } from "react";
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
  }: ClickablePeriodProps) => {
    return (
      <button
        ref={buttonRef}
        onClick={() => onSelectPeriod && onSelectPeriod()}
        aria-label={ariaLabel(start, end, status)}
        className={getConditionalClasses(cropped, direction, status)}
        data-clickable
        style={{
          width: `${width}%`,
          left: `${left}%`,
        }}
      >
        {icon}
      </button>
    );
  }
);

export default ClickablePeriod;
