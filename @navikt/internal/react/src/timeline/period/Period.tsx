import React, {
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from "react";
import { usePeriodContext } from "../hooks/usePeriodContext";
import { useRowContext } from "../hooks/useRowContext";
import ClickablePeriod from "./ClickablePeriod";
import NonClickablePeriod from "./NonClickablePeriod";

export interface PeriodPropsWrapper
  extends React.HTMLAttributes<HTMLDivElement> {
  start: Date;
  end: Date;
  icon?: ReactNode;
  status?: "success" | "warning" | "danger" | "information" | "default";
  onSelectPeriod?: () => void;
  id: string;
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
  /**
   * Popover content when clicking on the period.
   */
  children?: ReactNode;
}

export interface PeriodType
  extends React.ForwardRefExoticComponent<
    PeriodPropsWrapper & React.RefAttributes<HTMLDivElement>
  > {
  componentType: string;
}

export const Period = forwardRef<HTMLDivElement, PeriodPropsWrapper>(
  ({ end, icon, ...rest }, ref) => {
    const periodRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
    const { periods } = useRowContext();
    const { periodId } = usePeriodContext();

    const period = periods.find((p) => p.id === periodId);
    useEffect(() => {
      if (period?.active) periodRef.current?.focus();
    }, [period?.active]);

    if (!period) {
      return <></>;
    }
    const {
      start,
      endInclusive,
      width,
      horizontalPosition,
      status,
      onSelectPeriod,
      cropped,
      direction,
      children,
    } = period;

    return onSelectPeriod || children ? (
      <ClickablePeriod
        buttonRef={periodRef as RefObject<HTMLButtonElement>}
        start={start}
        end={endInclusive}
        status={status || "default"}
        onSelectPeriod={onSelectPeriod}
        cropped={cropped || ""}
        direction={direction}
        width={width}
        left={horizontalPosition}
        icon={icon}
        children={children}
      />
    ) : (
      <NonClickablePeriod
        divRef={periodRef as RefObject<HTMLDivElement>}
        start={start}
        end={endInclusive}
        status={status || "default"}
        cropped={cropped || ""}
        direction={direction}
        width={width}
        left={horizontalPosition}
        icon={icon}
      />
    );
  }
) as PeriodType;

Period.componentType = "period";

export default Period;
