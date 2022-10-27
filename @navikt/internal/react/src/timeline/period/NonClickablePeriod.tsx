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
}: NonClickablePeriodProps) => {
  return (
    <div
      ref={divRef}
      className={getConditionalClasses(cropped, direction, status)}
      aria-label={ariaLabel(start, end, status)}
      style={{
        width: `${width}%`,
        left: `${left}%`,
      }}
    >
      {icon}
    </div>
  );
};

export default NonClickablePeriod;
