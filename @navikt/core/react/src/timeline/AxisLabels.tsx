import { Detail } from "../typography/Detail";
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
import nbLocale from "date-fns/locale/nb";
import React from "react";
import { useTimelineContext } from "./hooks/useTimelineContext";
import { isVisible } from "./utils";
import { horizontalPositionAndWidth } from "./utils/calc";
import { AxisLabel, AxisLabelTemplates } from "./utils/types.external";

export const dayLabels = (
  start: Date,
  end: Date,
  totalDays: number,
  direction: "left" | "right",
  template: string = "dd.MM"
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
        label: format(day, template, { locale: nbLocale }),
        date: day,
        width: width,
      };
    })
    .filter((label) => label !== null) as AxisLabel[];
};

export const monthLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right",
  template: string = "MMM yy"
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
      label: format(month, template, { locale: nbLocale }),
      date: month,
      width: width,
    };
  });
};

export const yearLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right",
  template: string = "yyyy"
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
      label: format(year, template, { locale: nbLocale }),
      date: year,
      width: width,
    };
  });
};

const axisLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right",
  templates?: AxisLabelTemplates
): AxisLabel[] => {
  const totalDays = differenceInDays(end, start);
  if (totalDays < 40) {
    return dayLabels(start, end, totalDays, direction, templates?.day);
  } else if (totalDays < 370) {
    return monthLabels(start, end, direction, templates?.month);
  } else {
    return yearLabels(start, end, direction, templates?.year);
  }
};

export const AxisLabels = ({
  templates,
}: {
  templates?: AxisLabelTemplates;
}) => {
  const { endDate, startDate, direction } = useTimelineContext();
  const labels = axisLabels(startDate, endDate, direction, templates).filter(
    isVisible
  );

  return (
    <div className="navds-timeline__axislabels" aria-hidden="true">
      {labels.map((etikett) => (
        <Detail
          className="navds-timeline__axislabels-label"
          as="div"
          key={etikett.label}
          style={{
            justifyContent: direction === "left" ? "flex-start" : "flex-end",
            [direction]: `${etikett.horizontalPosition}%`,
            width: `${etikett.width}%`,
          }}
        >
          {etikett.label}
        </Detail>
      ))}
    </div>
  );
};
