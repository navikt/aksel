import React, { RefObject } from "react";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./Period";

interface NonClickablePeriodProps extends PeriodProps {
  divRef: RefObject<HTMLDivElement>;
}

const NonClickablePeriod = ({
  divRef,
  start,
  end,
  status,
  cropped,
  direction,
  left,
  width,
  icon,
  statusLabel,
}: NonClickablePeriodProps) => {
  return (
    <div
      ref={divRef}
      className={getConditionalClasses(cropped, direction, status)}
      aria-label={ariaLabel(start, end, status, statusLabel)}
      style={{
        width: `${width}%`,
        [direction]: `${left}%`,
      }}
    >
      {icon}
    </div>
  );
};

export default NonClickablePeriod;
