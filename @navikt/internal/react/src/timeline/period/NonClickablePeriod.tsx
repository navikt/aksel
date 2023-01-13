import React from "react";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./Period";

interface NonClickablePeriodProps extends PeriodProps {}

const NonClickablePeriod = ({
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
      className={getConditionalClasses(cropped, direction, status)}
      style={{
        width: `${width}%`,
        [direction]: `${left}%`,
      }}
    >
      <div className="navdsi-timeline__period--inner">
        {icon}
        <p className="sr-only">{ariaLabel(start, end, status, statusLabel)}</p>
      </div>
    </div>
  );
};

export default NonClickablePeriod;
