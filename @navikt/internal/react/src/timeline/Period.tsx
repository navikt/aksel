import { format } from "date-fns";
import React, {
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import ClickablePeriod from "./period/ClickablePeriod";
import { getConditionalClasses } from "./utils/period";

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

interface NonClickablePeriodProps extends PeriodProps {
  divRef: RefObject<HTMLDivElement>;
}

interface ClickablePeriodProps extends PeriodProps {
  buttonRef: RefObject<HTMLButtonElement>;
  onSelectPeriod?: () => void;
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

const ariaLabel = (startDate: Date, endDate: Date, status: String): string => {
  const start = format(startDate, "dd.MM.yyyy");
  const end = format(endDate, "dd.MM.yyyy");
  return `${status} fra ${start} til ${end}`;
};

const NonClickablePeriod = ({
  divRef,
  start,
  end,
  status,
  cropped,
  direction,
  left,
  width,
  icon,
}: NonClickablePeriodProps) => {
  return (
    <div
      ref={divRef}
      className={getConditionalClasses(cropped, direction, status)}
      aria-label={ariaLabel(start, end, status)}
      style={{
        width: `${width}%`,
        left: `${left}%`,
      }}
    >
      {icon}
    </div>
  );
};

export default Period;
