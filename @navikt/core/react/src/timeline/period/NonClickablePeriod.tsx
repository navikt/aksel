import React from "react";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";
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
      data-timeline-period
      ref={periodRef}
      tabIndex={-1}
      {...restProps}
      data-color={restProps?.["data-color"] ?? status}
      className={cl(
        getConditionalClasses(cropped, direction, status),
        restProps?.className,
      )}
      style={{
        width: `${width.toFixed(3)}%`,
        [direction]: `${left.toFixed(3)}%`,
      }}
    >
      <span className="aksel-timeline__period--inner">
        {icon}
        <span className="aksel-sr-only">
          {ariaLabel(start, end, status, statusLabel, translate)}
        </span>
      </span>
    </div>
  );
};

export default NonClickablePeriod;
