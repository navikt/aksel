import React from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";

interface AxisLabelsProps {
  start?: Date;
  end?: Date;
}

export const AxisLabels = ({ start, end }: AxisLabelsProps) => {
  const { endDate } = useTimelineContext();
  console.log(endDate);
  return <div className="navdsi-timeline__axislabels">axis</div>;
};
