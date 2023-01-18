import React, { forwardRef, ReactNode } from "react";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import { TimelineComponentTypes } from "../utils/types.internal";
import ClickablePeriod from "./ClickablePeriod";
import NonClickablePeriod from "./NonClickablePeriod";

export interface PeriodPropsWrapper
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
   * Icon displayed in the left side of the period.
   */
  icon?: ReactNode;
  /**
   * Period status.
   * @default "neutral"
   */
  status?: "success" | "warning" | "danger" | "info" | "neutral";
  /**
   * Status label
   */
  statusLabel?: string;
  /**
   * Callback when selecting a period.
   */
  onSelectPeriod?: () => void;
  /**
   * Popover content when clicking on the period.
   */
  children?: ReactNode;
  /**
   * Period is active
   */
  isActive?: boolean;
}

export interface PeriodProps {
  start: Date;
  end: Date;
  status: string;
  cropped: string;
  direction: string;
  width: Number;
  left: Number;
  icon?: ReactNode;
  children?: ReactNode;
  statusLabel?: string;
  restProps?: any;
}

export interface PeriodType
  extends React.ForwardRefExoticComponent<
    PeriodPropsWrapper & React.RefAttributes<HTMLDivElement | HTMLButtonElement>
  > {
  componentType: TimelineComponentTypes;
}

export const Period = forwardRef<HTMLDivElement, PeriodPropsWrapper>(
  ({ end, icon }, ref) => {
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
        children={children}
        isActive={isActive}
        statusLabel={statusLabel}
        restProps={restProps}
      />
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
  }
) as PeriodType;

Period.componentType = "period";

export default Period;
