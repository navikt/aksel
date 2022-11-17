import { useMemo } from "react";

import { addDays, endOfDay, isAfter, startOfDay, subDays } from "date-fns";

import { lastPeriod } from "../utils/sort";
import { Period } from "../utils/types.external";
import {
  InternalSimpleTimeline,
  PositionedPeriod,
} from "../utils/types.internal";

import { horizontalPositionAndWidth } from "../utils/calc";
import { invisiblePeriods, withinADay } from "../utils/filter";

const spatialPeriod = (
  period: Period,
  timelineStart: Date,
  timelineEndInclusive: Date,
  direction: "left" | "right" = "left",
  i: number,
  periods: PositionedPeriod[],
  rowIndex: number
): PositionedPeriod => {
  const start = period.start;
  const endInclusive = period.end;

  const rightOverlap =
    i < periods.length - 1 && !isAfter(periods[i + 1].start, endInclusive);

  const { horizontalPosition, width } = horizontalPositionAndWidth(
    startOfDay(start),
    endOfDay(
      rightOverlap ? startOfDay(subDays(periods[i + 1].start, 1)) : endInclusive
    ),
    timelineStart,
    timelineEndInclusive
  );

  return {
    id: `r-${rowIndex}-p-${i}`,
    start: start,
    endInclusive: endInclusive,
    horizontalPosition: horizontalPosition,
    direction: direction,
    width: width,
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
  allPeriods: PositionedPeriod[]
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
    width: width,
    horizontalPosition: horizontalPosition,
    cropped: cropped,
  };
};

export const useTimelineRows = (
  rows: any,
  startDate: Date,
  endDate: Date,
  direction: "left" | "right"
): InternalSimpleTimeline[] =>
  useMemo(
    () =>
      rows.map((periods: InternalSimpleTimeline, i: number) => {
        const rowIndex = i;
        const timelinePeriods = periods.periods
          .sort((a: Period, b: Period) => a.start.valueOf() - b.start.valueOf())
          .map((period: Period, i) =>
            spatialPeriod(
              period,
              startDate,
              endDate,
              direction,
              i,
              periods.periods,
              rowIndex
            )
          )
          .sort(lastPeriod)
          .map(adjustedEdges)
          .map(trimmedPeriods)
          .filter(invisiblePeriods);
        return {
          id: `tl-row-${rowIndex}`,
          label: periods.label,
          headingLevel: periods.headingLevel || "h3",
          icon: periods.icon,
          periods:
            direction === "left" ? timelinePeriods : timelinePeriods.reverse(),
        };
      }),
    [rows, startDate, endDate, direction]
  );

const earliestDate = (earliest: Date, period: Period) =>
  period.start < earliest ? period.start : earliest;

const earliestFomDate = (rader: Period[][]) =>
  rader.flat().reduce(earliestDate, new Date());

export const useEarliestDate = ({ startDate, rows }: any) =>
  useMemo(
    () => (startDate ? startDate : earliestFomDate(rows)),
    [startDate, rows]
  );

const latestDate = (latest: Date, period: Period) =>
  period.end > latest ? period.end : latest;

const latestTomDate = (rows: Period[][]) =>
  rows.flat().reduce(latestDate, new Date(0));

export const useLatestDate = ({ endDate, rows }: any) =>
  useMemo(
    () => (endDate ? endDate : addDays(latestTomDate(rows), 1)),
    [endDate, rows]
  );
