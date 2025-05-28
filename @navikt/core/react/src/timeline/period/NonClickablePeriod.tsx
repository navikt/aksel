import React from "react";
import { useRenameCSS } from "../../theme/Theme";
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

  const { cn } = useRenameCSS();
  return (
    <div
      ref={periodRef}
      {...restProps}
      data-color={restProps?.["data-color"] ?? status}
      className={cn(
        getConditionalClasses(cropped, direction, status),
        restProps?.className,
      )}
      style={{
        width: `${width}%`,
        [direction]: `${left}%`,
      }}
    >
      <span className={cn("navds-timeline__period--inner")}>
        {icon}
        <span className={cn("navds-sr-only")}>
          {ariaLabel(start, end, status, statusLabel, translate)}
        </span>
      </span>
    </div>
  );
};

export default NonClickablePeriod;
