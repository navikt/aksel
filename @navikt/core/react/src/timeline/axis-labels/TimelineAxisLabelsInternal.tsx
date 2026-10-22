import {
  type Locale,
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  differenceInMilliseconds,
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
import React, { useMemo } from "react";
import { Detail } from "../../typography/Detail";
import { useDateLocale, useI18n } from "../../utils/i18n/i18n.hooks";
import type { TFunction } from "../../utils/i18n/i18n.types";
import { useTimelineContext } from "../root/TimelineRoot.context";
import { horizontalPositionAndWidth } from "../utils/calc";
import type { AxisLabel, AxisLabelTemplates } from "../utils/types.external";

// Use 23 hours as a conservative day length so DST-shortened days still qualify.
const MIN_SAFE_DAY_IN_MILLISECONDS = 23 * 60 * 60 * 1000;
const MAX_LABEL_COUNT = 100;

interface AxisLabelSet {
  id: string;
  labels: AxisLabel[];
  slotWidth: number;
}

const dayLabels = (
  start: Date,
  end: Date,
  intervalDays: number,
  direction: "left" | "right",
  template: string,
  locale: Locale,
): AxisLabel[] => {
  const totalDays = differenceInDays(end, start);
  const count = Math.ceil(totalDays / intervalDays) + 1;

  if (count > MAX_LABEL_COUNT) {
    return [];
  }

  const lastDay = startOfDay(end);
  return Array.from({ length: count }, (_, i) => {
    const day: Date = subDays(lastDay, i * intervalDays);
    const { horizontalPosition, width } = horizontalPositionAndWidth(
      day,
      addDays(day, intervalDays),
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

const monthLabels = (
  start: Date,
  end: Date,
  intervalMonths: number,
  direction: "left" | "right",
  template: string,
  locale: Locale,
): AxisLabel[] => {
  const startMonth = startOfMonth(start);
  const endMonth = endOfMonth(end);
  // Count calendar boundaries at this interval, not elapsed 30-day periods.
  const numberOfMonths =
    Math.floor(differenceInMonths(endMonth, startMonth) / intervalMonths) + 1;
  if (numberOfMonths > MAX_LABEL_COUNT) {
    return [];
  }

  return Array.from({ length: numberOfMonths }, (_, i) => {
    const month: Date = addMonths(startMonth, i * intervalMonths);
    const { horizontalPosition, width } = horizontalPositionAndWidth(
      month,
      addMonths(month, intervalMonths),
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

const yearLabels = (
  start: Date,
  end: Date,
  intervalYears: number,
  direction: "left" | "right",
  template: string,
  locale: Locale,
): AxisLabel[] => {
  const firstYear = startOfYear(start);
  const lastYear = endOfYear(end);

  const yearCount =
    Math.floor(differenceInYears(lastYear, start) / intervalYears) + 1;
  if (yearCount > MAX_LABEL_COUNT) {
    return [];
  }

  return Array.from({ length: yearCount }, (_, i) => {
    const year: Date = addYears(firstYear, i * intervalYears);
    const { horizontalPosition, width } = horizontalPositionAndWidth(
      year,
      addYears(year, intervalYears),
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

const getLabelSets = (
  start: Date,
  end: Date,
  direction: "left" | "right",
  locale: Locale,
  translate: TFunction<"Timeline">,
): AxisLabelSet[] => {
  const duration = differenceInMilliseconds(end, start);
  if (!Number.isFinite(duration) || duration <= 0) {
    return [];
  }

  const dayTemplate = translate("dayFormat");
  const monthTemplate = translate("monthFormat");
  const yearTemplate = translate("yearFormat");

  const intervals: {
    id: string;
    template: string;
    getLabels: () => AxisLabel[];
  }[] = [];

  /* CSS progressively reveals nested tiers */
  for (const intervalDays of [1, 2, 7, 8, 14]) {
    if (intervalDays * MIN_SAFE_DAY_IN_MILLISECONDS > duration) {
      continue;
    }
    intervals.push({
      id: `day-${intervalDays}`,
      template: dayTemplate,
      getLabels: () =>
        dayLabels(start, end, intervalDays, direction, dayTemplate, locale),
    });
  }

  for (const intervalMonths of [1, 2, 3, 6]) {
    const intervalDays = intervalMonths * 28;
    if (intervalDays * MIN_SAFE_DAY_IN_MILLISECONDS > duration) {
      continue;
    }
    intervals.push({
      id: `month-${intervalMonths}`,
      template: monthTemplate,
      getLabels: () =>
        monthLabels(
          start,
          end,
          intervalMonths,
          direction,
          monthTemplate,
          locale,
        ),
    });
  }

  for (let intervalYears = 1; ; intervalYears *= 2) {
    const intervalDays = intervalYears * 365;
    if (intervalDays * MIN_SAFE_DAY_IN_MILLISECONDS > duration) {
      break;
    }
    intervals.push({
      id: `year-${intervalYears}`,
      template: yearTemplate,
      getLabels: () =>
        yearLabels(start, end, intervalYears, direction, yearTemplate, locale),
    });
  }

  return intervals
    .map(({ id, template, getLabels }) => {
      const labels = getLabels();
      /* Use the narrowest calendar slot so this tier fits even in shorter periods */
      const slotWidth = Math.min(100, ...labels.map(({ width }) => width));
      const visibleLabels = labels
        .filter(
          ({ horizontalPosition }) =>
            horizontalPosition >= 0 && horizontalPosition + slotWidth <= 100,
        )
        .sort((a, b) => a.horizontalPosition - b.horizontalPosition);

      /* Coarse interval may have no calendar boundary inside the range */
      if (labels.length > 0 && visibleLabels.length === 0) {
        visibleLabels.push({
          ...labels[0],
          date: start,
          horizontalPosition: 0,
          label: format(start, template, { locale }),
        });
      }

      return { id, slotWidth, labels: visibleLabels };
    })
    .filter(({ labels }) => labels.length > 0);
};

const TimelineAxisLabelsInternal = ({
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

  const labelSets = useMemo(
    () => getLabelSets(startDate, endDate, direction, locale, translate),
    [startDate, endDate, direction, locale, translate],
  );

  return (
    <div className="aksel-timeline__axislabels" aria-hidden="true">
      {labelSets.reduceRight<React.ReactNode>(
        (coarserTier, labelSet, index) => (
          <div
            className="aksel-timeline__axislabels-tier"
            key={labelSet.id}
            data-axis-labels-coarsest={
              index === labelSets.length - 1 || undefined
            }
            style={{
              [direction]: 0,
              width: `${
                (labelSet.slotWidth /
                  (labelSets[index - 1]?.slotWidth ?? 100)) *
                100
              }%`,
            }}
          >
            {labelSet.labels.map((label) => (
              <Detail
                className="aksel-timeline__axislabels-label"
                as="div"
                key={label.date.getTime()}
                data-axis-labels-density={labelSet.id}
                style={{
                  textAlign: direction,
                  [direction]: `${
                    (label.horizontalPosition / labelSet.slotWidth) * 100
                  }%`,
                }}
              >
                {label.label}
              </Detail>
            ))}
            {coarserTier}
          </div>
        ),
        null,
      )}
    </div>
  );
};

export { TimelineAxisLabelsInternal };
