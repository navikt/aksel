import React, {
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
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
}

export type PeriodType = React.ForwardRefExoticComponent<
  PeriodPropsWrapper & React.RefAttributes<HTMLDivElement>
>;

export const Period = forwardRef<HTMLDivElement, PeriodPropsWrapper>(
  ({ end, icon, ...rest }, ref) => {
    const periodRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
    const [isMini, setIsMini] = useState(false);
    const { periods } = useRowContext();
    const { periodId } = usePeriodContext();
    useLayoutEffect(() => {
      const currentWidth = periodRef?.current?.offsetWidth;
      if (currentWidth && currentWidth < 30) {
        setIsMini(true);
      }
    }, [periodRef]);

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
    } = period;

    return onSelectPeriod ? (
      <ClickablePeriod
        buttonRef={ref as RefObject<HTMLButtonElement>}
        start={start}
        end={endInclusive}
        status={status || "default"}
        onSelectPeriod={onSelectPeriod}
        cropped={cropped || ""}
        direction={direction}
        width={width}
        left={horizontalPosition}
        icon={icon}
      />
    ) : (
      <NonClickablePeriod
        divRef={ref as RefObject<HTMLDivElement>}
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
);

export default Period;
