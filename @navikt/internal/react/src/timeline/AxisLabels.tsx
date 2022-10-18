import React from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";

interface AxisLabelsProps {
  start?: Date;
  end?: Date;
}

export const AxisLabels = ({ start, end }: AxisLabelsProps) => {
  const { startDate } = useTimelineContext();
  return (
    <div className="navdsi-timeline__axislabels">
      {startDate.toDateString()}
    </div>
  );
};
