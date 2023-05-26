import React from "react";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import { PeriodProps } from "./index";
import cl from "clsx";

interface TimelineNonClickablePeriodProps extends PeriodProps {
  periodRef?: React.ForwardedRef<HTMLDivElement>;
}

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
  restProps,
  periodRef,
}: TimelineNonClickablePeriodProps) => {
  return (
    <div
      ref={periodRef}
      {...restProps}
      className={cl(
        getConditionalClasses(cropped, direction, status),
        restProps?.classname
      )}
      style={{
        width: `${width}%`,
        [direction]: `${left}%`,
      }}
    >
      <span className="navds-timeline__period--inner">
        {icon}
        <span className="sr-only">
          {ariaLabel(start, end, status, statusLabel)}
        </span>
      </span>
    </div>
  );
};

export default NonClickablePeriod;
