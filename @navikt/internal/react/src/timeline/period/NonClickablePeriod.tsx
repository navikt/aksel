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
      <div className="navdsi-timeline__period--inner">
        {icon}
        <p className="sr-only">{ariaLabel(start, end, status, statusLabel)}</p>
      </div>
    </div>
  );
};

export default NonClickablePeriod;
