import cl from "clsx";
import React from "react";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { ariaLabel, getConditionalClasses } from "../utils/period";
import type { PeriodProps } from "./types";

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
  const translate = useI18n("Timeline");

  return (
    <div
      ref={periodRef}
      {...restProps}
      className={cl(
        getConditionalClasses(cropped, direction, status),
        restProps?.className,
      )}
      style={{
        width: `${width}%`,
        [direction]: `${left}%`,
      }}
    >
      <span className="navds-timeline__period--inner">
        {icon}
        <span className="sr-only">
          {ariaLabel(start, end, status, statusLabel, translate)}
        </span>
      </span>
    </div>
  );
};

export default NonClickablePeriod;
