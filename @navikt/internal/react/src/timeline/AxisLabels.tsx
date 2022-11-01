import {
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  endOfMonth,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
} from "date-fns";
import React from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";
import { isVisible } from "./utils";
import { horizontalPositionAndWidth } from "./utils/calc";
import { AxisLabel } from "./utils/types.external";

export const dayLabels = (
  start: Date,
  end: Date,
  totalDays: number,
  direction: "left" | "right"
): AxisLabel[] => {
  const increment = Math.ceil(totalDays / 10);
  const lastDay = startOfDay(end);
  return new Array(totalDays)
    .fill(lastDay)
    .map((thisDay, i) => {
      if (i % increment !== 0) return null;
      const day: Date = subDays(thisDay, i);
      const { horizontalPosition, width } = horizontalPositionAndWidth(
        day,
        addDays(day, 1),
        start,
        end
      );
      return {
        direction: direction,
        horizontalPosition: horizontalPosition,
        label: format(day, "MM.dd"),
        date: day,
        width: width,
      };
    })
    .filter((label) => label !== null) as AxisLabel[];
};

export const monthLabels = (
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
      label: format(month, "MMM yy"),
      date: month,
      width: width,
    };
  });
};

export const yearLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right"
): AxisLabel[] => {
  const firstYear = startOfYear(start);
  const lastYear = endOfYear(end);
  const yearCount = differenceInYears(lastYear, start) + 1;
  return new Array(yearCount).fill(firstYear).map((thisYear, i) => {
    const year: Date = addYears(thisYear, i);
    const { horizontalPosition, width } = horizontalPositionAndWidth(
      year,
      addYears(year, 1),
      start,
      end
    );
    return {
      direction: direction,
      horizontalPosition: horizontalPosition,
      label: year.getFullYear().toString(),
      date: year,
      width: width,
    };
  });
};

const axisLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right"
): AxisLabel[] => {
  const totalDays = differenceInDays(end, start);
  if (totalDays < 40) {
    return dayLabels(start, end, totalDays, direction);
  } else if (totalDays < 370) {
    return monthLabels(start, end, direction);
  } else {
    return yearLabels(start, end, direction);
  }
};

export const AxisLabels = () => {
  const { endDate, startDate, direction } = useTimelineContext();
  const labels = axisLabels(startDate, endDate, direction).filter(isVisible);

  return (
    <div className="navdsi-timeline__axislabels" aria-hidden="true">
      {labels.map((etikett) => (
        <div
          key={etikett.label}
          style={{
            display: "flex",
            justifyContent: direction === "left" ? "flex-start" : "flex-end",
            [direction]: `${etikett.horizontalPosition}%`,
            width: `${etikett.width}%`,
          }}
        >
          {etikett.label}
        </div>
      ))}
    </div>
  );
};
