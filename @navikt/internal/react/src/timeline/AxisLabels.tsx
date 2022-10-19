import React from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";

interface AxisLabelsProps {
  start?: Date;
  end?: Date;
}

export const AxisLabels = ({ start, end }: AxisLabelsProps) => {
  const { startDate, periods } = useTimelineContext();
  console.log(periods);
  return <div className="navdsi-timeline__axislabels">axis</div>;
};
