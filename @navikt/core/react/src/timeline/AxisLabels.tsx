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
import React, { useCallback, useMemo } from "react";
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
  const count = Math.ceil(totalDays / increment);
  return Array.from({ length: count }, (_, i) => {
    const day: Date = subDays(lastDay, i * increment);
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
  });
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
  return Array.from({ length: numberOfMonths }, (_, i) => {
    const month: Date = addMonths(startMonth, i);
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
  return Array.from({ length: yearCount }, (_, i) => {
    const year: Date = addYears(firstYear, i);
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

  const labels = useMemo(
    () =>
      getLabels(startDate, endDate, direction, locale, translate).filter(
        isVisible,
      ),
    [startDate, endDate, direction, locale, translate],
  );

  const getLabelWidth = useCallback(
    (calculatedWidth: number, index: number) => {
      const comparator = direction === "right" ? labels.length - 1 : 0;
      if (index === comparator) {
        return undefined;
      }
      return `${calculatedWidth.toFixed(3)}%`;
    },
    [direction, labels.length],
  );

  const justifyContent = direction === "left" ? "flex-start" : "flex-end";

  return (
    <div
      className="aksel-timeline__axislabels"
      aria-hidden="true"
      data-direction={direction}
    >
      {labels.map((etikett, index) => (
        <Detail
          className="aksel-timeline__axislabels-label"
          as="div"
          key={etikett.label}
          style={{
            justifyContent,
            [direction]: `${etikett.horizontalPosition.toFixed(3)}%`,
            width: getLabelWidth(etikett.width, index),
          }}
        >
          {etikett.label}
        </Detail>
      ))}
    </div>
  );
};
