import { differenceInDays } from "date-fns";
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
import { useTimelineContext } from "./hooks/useTimelineContext";

export interface PeriodProps extends React.HTMLAttributes<HTMLDivElement> {
  start: Date;
  end: Date;
  icon?: ReactNode;
  status?: "success" | "warning" | "danger" | "information" | "default";
  onSelectPeriod?: () => void;
}

export type PeriodType = React.ForwardRefExoticComponent<
  PeriodProps & React.RefAttributes<HTMLDivElement>
>;

export const Period = forwardRef<HTMLDivElement, PeriodProps>(
  ({ end, icon, ...rest }, ref) => {
    const periodRef = useRef<HTMLButtonElement | HTMLDivElement>(null);
    const [isMini, setIsMini] = useState(false);
    const { endDate, startDate } = useTimelineContext();
    const { periods } = useRowContext();
    const { periodId } = usePeriodContext();

    useLayoutEffect(() => {
      console.log(periodRef);
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
      active,
      status,
      onSelectPeriod,
    } = period;

    const totalDays = differenceInDays(endDate, startDate);
    //const width = (differenceInDays(end, start) / totalDays) * 100;
    const left = (differenceInDays(start, startDate) / totalDays) * 100;
    //console.log(periodRef);

    let statusColor = "grey";
    switch (status) {
      case "success":
        statusColor = "green";
        break;
      case "warning":
        statusColor = "yellow";
        break;
      case "danger":
        statusColor = "red";
        break;
      default:
        break;
    }
    return (
      <div
        className="navdsi-timeline__period"
        ref={periodRef as RefObject<HTMLDivElement>}
        style={{
          height: "3rem",
          background: statusColor,
          width: `${width}%`,
          left: `${left}%`,
          position: "absolute",
          border: "1px solid black",
        }}
      >
        period
      </div>
    );
  }
);

export default Period;
