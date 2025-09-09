import React, { forwardRef } from "react";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import type { TimelineComponentTypes } from "../utils/types.internal";
import ClickablePeriod from "./ClickablePeriod";
import NonClickablePeriod from "./NonClickablePeriod";

export interface TimelinePeriodProps
  extends React.HTMLAttributes<HTMLDivElement> {
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
   * Status label for screen-readers
   * e.g "Sykemeldt", "foreldrepermisjon"
   */
  statusLabel?: string;
  /**
   * Callback when selecting a period.
   */
  onSelectPeriod?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
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

export interface PeriodType
  extends React.ForwardRefExoticComponent<
    TimelinePeriodProps &
      React.RefAttributes<HTMLDivElement | HTMLButtonElement>
  > {
  componentType: TimelineComponentTypes;
}

export const Period = forwardRef<HTMLDivElement, TimelinePeriodProps>(
  ({ icon }: TimelinePeriodProps, ref) => {
    const { periods } = useRowContext();
    const { periodId, restProps } = usePeriodContext();

    const period = periods.find((p) => p.id === periodId);

    if (!period) {
      return <></>;
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
      <ClickablePeriod
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
      </ClickablePeriod>
    ) : (
      <NonClickablePeriod
        periodRef={ref}
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
  },
) as PeriodType;

Period.componentType = "period";

export default Period;
