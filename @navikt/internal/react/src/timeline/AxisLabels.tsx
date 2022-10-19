import {
  addMonths,
  differenceInMonths,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";
import React from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";
import { isVisible } from "./utils";
import { horizontalPositionAndWidth } from "./utils/calc";
import { AxisLabel } from "./utils/types";

export const månedsetiketter = (
  start: Date,
  end: Date,
  direction: "left" | "right"
): AxisLabel[] => {
  const startMonth = startOfMonth(start);
  const endMonth = endOfMonth(end);
  const numberOfMonths = differenceInMonths(endMonth, startMonth) + 1;
  return new Array(numberOfMonths).fill(startMonth).map((thisMonth, i) => {
    const month: Date = addMonths(thisMonth, i);
    const { horizontalPosition, width } = horizontalPositionAndWidth(
      month,
      addMonths(month, 1),
      start,
      end
    );
    return {
      direction: direction,
      horizontalPosition: horizontalPosition,
      label: format(month, "MM yy"),
      date: month,
      width: width,
    };
  });
};

const axisLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right"
): AxisLabel[] => {
  return månedsetiketter(start, end, direction);
};

export const AxisLabels = () => {
  const { endDate, startDate } = useTimelineContext();
  const labels = axisLabels(startDate, endDate, "left").filter(isVisible);
  console.log(labels);
  return <div className="navdsi-timeline__axislabels">axis</div>;
};
