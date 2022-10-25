import cl from "clsx";
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
  status: String;
  cropped: String;
  direction: String;
  width: Number;
  statusColor: string;
  left: Number;
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

    console.log(period);

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

    return onSelectPeriod ? (
      <ClickablePeriod
        buttonRef={ref as RefObject<HTMLButtonElement>}
        start={start}
        end={endInclusive}
        status={status || "default"}
        onSelectPeriod={onSelectPeriod}
        cropped={cropped || ""}
        direction={direction}
        statusColor={statusColor}
        width={width}
        left={horizontalPosition}
      />
    ) : (
      <NonClickablePeriod
        divRef={ref as RefObject<HTMLDivElement>}
        start={start}
        end={endInclusive}
        status={status || "default"}
        cropped={cropped || ""}
        direction={direction}
        statusColor={statusColor}
        width={width}
        left={horizontalPosition}
      />
    );
  }
);

const ariaLabel = (startDate: Date, endDate: Date, status: String): string => {
  const start = format(startDate, "dd.MM.yyyy");
  const end = format(endDate, "dd.MM.yyyy");
  return `${status} fra ${start} til ${end}`;
};

const ClickablePeriod = React.memo(
  ({
    buttonRef,
    onSelectPeriod,
    start,
    end,
    status,
    cropped,
    direction,
    statusColor,
    left,
    width,
  }: ClickablePeriodProps) => {
    return (
      <button
        ref={buttonRef}
        onClick={() => onSelectPeriod && onSelectPeriod()}
        aria-label={ariaLabel(start, end, status)}
        className={cl("navdsi-timeline__period", {
          "navdsi-timeline__period--connectedBoth": cropped === "both",
          "navdsi-timeline__period--connectedRight":
            (cropped === "right" && direction === "left") ||
            (cropped === "left" && direction === "right"),
          "navdsi-timeline__period--connectedLeft":
            (cropped === "left" && direction === "left") ||
            (cropped === "right" && direction === "right"),
        })}
        style={{
          backgroundColor: statusColor,
          width: `${width}%`,
          left: `${left}%`,
        }}
      ></button>
    );
  }
);

const NonClickablePeriod = ({
  divRef,
  start,
  end,
  status,
  cropped,
  direction,
  statusColor,
  left,
  width,
}: NonClickablePeriodProps) => {
  console.log(cropped);
  return (
    <div
      ref={divRef}
      className={cl("navdsi-timeline__period", {
        "navdsi-timeline__period--connectedBoth": cropped === "both",
        "navdsi-timeline__period--connectedRight":
          (cropped === "right" && direction === "left") ||
          (cropped === "left" && direction === "right"),
        "navdsi-timeline__period--connectedLeft":
          (cropped === "left" && direction === "left") ||
          (cropped === "right" && direction === "right"),
      })}
      aria-label={ariaLabel(start, end, status)}
      style={{
        background: statusColor,
        width: `${width}%`,
        left: `${left}%`,
      }}
    ></div>
  );
};

export default Period;
