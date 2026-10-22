import React, { forwardRef, useMemo } from "react";
import type { AkselColor } from "../../types";
import { TimelineClickablePeriodInternal } from "../period-clickable/TimelineClickablePeriodInternal";
import { TimelineNonClickablePeriodInternal } from "../period-non-clickable/TimelineNonClickablePeriodInternal";
import { useRowContext } from "../row/TimelineRow.context";
import { usePeriodContext } from "./TimelinePeriod.context";

interface TimelinePeriodProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Period start date.
   */
  start: Date;
  /**
   * Period end date.
   */
  end: Date;
  /**
   * Icon for easier visual identification.
   */
  icon?: React.ReactNode;
  /**
   * Period status.
   * @default "neutral"
   */
  status?: "success" | "warning" | "danger" | "info" | "neutral";
  /**
   * Overrides color set by status.
   *
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)
   */
  "data-color"?: AkselColor;
  /**
   * Status label for screen-readers
   * e.g "Sykemeldt", "foreldrepermisjon"
   */
  statusLabel?: string;
  /**
   * Callback when selecting a period.
   */
  onSelectPeriod?: (
    event: React.MouseEvent<Element> | React.KeyboardEvent<Element>,
  ) => void;
  /**
   * Content displayed in Popover on click.
   */
  children?: React.ReactNode;
  /**
   * Visual active inidcation on period.
   *
   * Make sure only one period is active at a time.
   */
  isActive?: boolean;
  /**
   * Default orientation of popover
   * @default "top"
   */
  placement?: "top" | "bottom";
}

const TimelinePeriodBase = forwardRef<
  HTMLDivElement | HTMLButtonElement,
  TimelinePeriodProps
>(({ icon }: TimelinePeriodProps, ref) => {
  const { periods } = useRowContext();
  const { periodId, restProps } = usePeriodContext();

  const period = useMemo(() => {
    return periods.find((p) => p.id === periodId);
  }, [periods, periodId]);

  if (!period) {
    return null;
  }

  const {
    start,
    endInclusive,
    width,
    horizontalPosition,
    status = "neutral",
    onSelectPeriod,
    cropped,
    direction,
    children,
    isActive,
    statusLabel,
  } = period;

  return onSelectPeriod || children ? (
    <TimelineClickablePeriodInternal
      periodRef={ref as React.ForwardedRef<HTMLButtonElement>}
      start={start}
      end={endInclusive}
      status={status}
      onSelectPeriod={onSelectPeriod}
      cropped={cropped || ""}
      direction={direction}
      width={width}
      left={horizontalPosition}
      icon={icon}
      isActive={isActive}
      statusLabel={statusLabel}
      restProps={restProps}
    >
      {children}
    </TimelineClickablePeriodInternal>
  ) : (
    <TimelineNonClickablePeriodInternal
      periodRef={ref as React.ForwardedRef<HTMLDivElement>}
      start={start}
      end={endInclusive}
      status={status}
      cropped={cropped || ""}
      direction={direction}
      width={width}
      left={horizontalPosition}
      icon={icon}
      statusLabel={statusLabel}
      restProps={restProps}
    />
  );
});

const TimelinePeriod = Object.assign(TimelinePeriodBase, {
  componentType: "period" as const,
});

export { TimelinePeriod };
export type { TimelinePeriodProps };
