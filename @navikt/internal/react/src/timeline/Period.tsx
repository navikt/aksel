import { differenceInDays } from "date-fns";
import React, { forwardRef, ReactNode } from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";

export interface PeriodProps extends React.HTMLAttributes<HTMLDivElement> {
  start: Date;
  end: Date;
  icon?: ReactNode;
  status?: "success" | "warning" | "error" | "default";
}

export type PeriodType = React.ForwardRefExoticComponent<
  PeriodProps & React.RefAttributes<HTMLDivElement>
>;

export const Period = forwardRef<HTMLDivElement, PeriodProps>(
  ({ start, end, icon, status = "default", ...rest }, ref) => {
    const { endDate, startDate } = useTimelineContext();
    const totalDays = differenceInDays(endDate, startDate);
    const width = (differenceInDays(end, start) / totalDays) * 100;
    const left = (differenceInDays(start, startDate) / totalDays) * 100;

    let statusColor = "grey";
    switch (status) {
      case "success":
        statusColor = "green";
        break;
      case "warning":
        statusColor = "yellow";
        break;
      case "error":
        statusColor = "red";
        break;
      default:
        break;
    }

    const styles = {
      height: "3rem",
      background: statusColor,
      width: `${width}%`,
      left: `${left}%`,
      position: "absolute",
      border: "1px solid black",
    };
    return (
      <div className="navdsi-timeline__period" style={styles}>
        period
      </div>
    );
  }
);

export default Period;
