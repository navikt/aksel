import {
  Locale,
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
import { Detail } from "../typography/Detail";
import { useDateLocale, useI18n } from "../utils/i18n/i18n.hooks";
import { TFunction } from "../utils/i18n/i18n.types";
import { useTimelineContext } from "./hooks/useTimelineContext";
import { isVisible } from "./utils";
import { horizontalPositionAndWidth } from "./utils/calc";
import { AxisLabel, AxisLabelTemplates } from "./utils/types.external";

export const dayLabels = (
  start: Date,
  end: Date,
  totalDays: number,
  direction: "left" | "right",
  template: string,
  locale: Locale,
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
        end,
      );
      return {
        direction,
        horizontalPosition,
        label: format(day, template, { locale }),
        date: day,
        width,
      };
    })
    .filter((label) => label !== null) as AxisLabel[];
};

export const monthLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right",
  template: string,
  locale: Locale,
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
      end,
    );
    return {
      direction,
      horizontalPosition,
      label: format(month, template, { locale }),
      date: month,
      width,
    };
  });
};

export const yearLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right",
  template: string,
  locale: Locale,
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
      end,
    );
    return {
      direction,
      horizontalPosition,
      label: format(year, template, { locale }),
      date: year,
      width,
    };
  });
};

const getLabels = (
  start: Date,
  end: Date,
  direction: "left" | "right",
  locale: Locale,
  translate: TFunction<"Timeline">,
): AxisLabel[] => {
  const totalDays = differenceInDays(end, start);
  if (totalDays < 40) {
    const dayTemplate = translate("dayFormat");
    return dayLabels(start, end, totalDays, direction, dayTemplate, locale);
  }

  if (totalDays < 370) {
    const monthTemplate = translate("monthFormat");
    return monthLabels(start, end, direction, monthTemplate, locale);
  }

  const yearTemplate = translate("yearFormat");
  return yearLabels(start, end, direction, yearTemplate, locale);
};

export const AxisLabels = ({
  templates,
}: {
  templates?: AxisLabelTemplates;
}) => {
  const { endDate, startDate, direction } = useTimelineContext();

  const translate = useI18n("Timeline", {
    dayFormat: templates?.day,
    monthFormat: templates?.month,
    yearFormat: templates?.year,
  });
  const locale = useDateLocale();

  const labels = getLabels(startDate, endDate, direction, locale, translate);

  return (
    <div className="aksel-timeline__axislabels" aria-hidden="true">
      {labels.filter(isVisible).map((etikett) => (
        <Detail
          className="aksel-timeline__axislabels-label"
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
