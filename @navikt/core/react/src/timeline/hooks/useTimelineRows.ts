import { addDays, endOfDay, isAfter, startOfDay, subDays } from "date-fns";
import { useMemo } from "react";
import { horizontalPositionAndWidth } from "../utils/calc";
import { invisiblePeriods, withinADay } from "../utils/filter";
import { lastPeriod } from "../utils/sort";
import { Period } from "../utils/types.external";
import {
  InternalSimpleTimeline,
  PositionedPeriod,
} from "../utils/types.internal";

const spatialPeriod = (
  period: Period,
  timelineStart: Date,
  timelineEndInclusive: Date,
  direction: "left" | "right" = "left",
  i: number,
  periods: PositionedPeriod[],
  rowIndex: number,
): PositionedPeriod => {
  const start = period.start;
  const endInclusive = period.end;

  const rightOverlap =
    i < periods.length - 1 && !isAfter(periods[i + 1].start, endInclusive);

  const { horizontalPosition, width } = horizontalPositionAndWidth(
    startOfDay(start),
    endOfDay(
      rightOverlap
        ? startOfDay(subDays(periods[i + 1].start, 1))
        : endInclusive,
    ),
    timelineStart,
    timelineEndInclusive,
  );

  return {
    id: `r-${rowIndex}-p-${i}`,
    start,
    endInclusive,
    horizontalPosition,
    direction,
    width,
    end: endInclusive,
    status: period.status,
    onSelectPeriod: period.onSelectPeriod,
    icon: period.icon,
    children: period.children,
    isActive: period.isActive,
    statusLabel: period.statusLabel,
  };
};

const adjustedEdges = (
  period: PositionedPeriod,
  i: number,
  allPeriods: PositionedPeriod[],
): PositionedPeriod => {
  const left =
    i > 0 && withinADay(period.start, allPeriods[i - 1].endInclusive);
  const right =
    i < allPeriods.length - 1 &&
    withinADay(allPeriods[i + 1].start, period.endInclusive);

  return left && right
    ? { ...period, cropped: "both" }
    : left
      ? { ...period, cropped: "left" }
      : right
        ? { ...period, cropped: "right" }
        : period;
};

const trimmedPeriods = (period: PositionedPeriod) => {
  let { horizontalPosition, width, cropped } = period;
  if (horizontalPosition + width > 100) {
    width = 100 - horizontalPosition;
    cropped = cropped === "left" || cropped === "both" ? "both" : "right";
  }
  if (horizontalPosition < 0 && horizontalPosition + width > 0) {
    width = horizontalPosition + width;
    horizontalPosition = 0;
    cropped = cropped === "right" || cropped === "both" ? "both" : "left";
  }

  return {
    ...period,
    width,
    horizontalPosition,
    cropped,
  };
};

export const useTimelineRows = (
  rows: any,
  startDate: Date,
  endDate: Date,
  direction: "left" | "right",
): InternalSimpleTimeline[] =>
  useMemo(
    () =>
      rows.map((periods: InternalSimpleTimeline, rowIndex: number) => {
        const timelinePeriods = periods.periods
          .sort((a: Period, b: Period) => a.start.valueOf() - b.start.valueOf())
          .map((period: Period & { restProps?: any; ref?: any }, i) => ({
            ...spatialPeriod(
              period,
              startDate,
              endDate,
              direction,
              i,
              periods.periods,
              rowIndex,
            ),
            restProps: period?.restProps,
            ref: period?.ref,
          }))
          .sort(lastPeriod)
          .map(adjustedEdges)
          .map(trimmedPeriods)
          .filter(invisiblePeriods);
        return {
          id: `tl-row-${rowIndex}`,
          label: periods.label,
          headingTag: periods.headingTag || "h3",
          icon: periods.icon,
          periods:
            direction === "left" ? timelinePeriods : timelinePeriods.reverse(),
          restProps: periods?.restProps,
          ref: periods?.ref,
        };
      }),
    [rows, startDate, endDate, direction],
  );

export const useEarliestDate = ({
  startDate,
  rows,
}: {
  startDate?: Date;
  rows: Pick<Period, "start">[][];
}) =>
  useMemo(() => {
    if (startDate) {
      return startDate;
    }

    const startDates = rows
      .flat()
      .filter((period) => period.start)
      .map((period) => period.start);

    if (startDates.length === 0) {
      return new Date();
    }

    const earliestDate = startDates.reduce((earliest, current) =>
      current < earliest ? current : earliest,
    );

    return earliestDate;
  }, [startDate, rows]);

const latestDate = (latest: Date, period: Period) =>
  period.end > latest ? period.end : latest;

const latestTomDate = (rows: Period[][]) =>
  rows.flat().reduce(latestDate, new Date(0));

export const useLatestDate = ({ endDate, rows }: any) =>
  useMemo(
    () => (endDate ? endDate : addDays(latestTomDate(rows), 1)),
    [endDate, rows],
  );
