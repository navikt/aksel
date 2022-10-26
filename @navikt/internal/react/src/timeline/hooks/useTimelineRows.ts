import { nanoid } from "nanoid";
import { useMemo } from "react";

import { addDays, endOfDay, startOfDay } from "date-fns";

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
  direction: "left" | "right" = "left"
): PositionedPeriod => {
  const start = period.start;
  const endInclusive = period.end;
  const { horizontalPosition, width } = horizontalPositionAndWidth(
    startOfDay(start),
    endOfDay(endInclusive),
    timelineStart,
    timelineEndInclusive
  );

  return {
    id: period.id || nanoid(),
    start: start,
    endInclusive: endInclusive,
    horizontalPosition: horizontalPosition,
    hoverLabel: period.hoverLabel,
    direction: direction,
    className: period.className,
    disabled: period.disabled,
    active: period.active || false,
    infoPin: period.infoPin,
    width: width,
    end: endInclusive,
    status: period.status,
    onSelectPeriod: period.onSelectPeriod,
    icon: period.icon,
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
      rows.map((periods: Period[]) => {
        const timelinePeriods = periods
          .map((period: Period) =>
            spatialPeriod(period, startDate, endDate, direction)
          )
          .sort(lastPeriod)
          .map(adjustedEdges)
          .map(trimmedPeriods)
          .filter(invisiblePeriods);
        return {
          id: nanoid(),
          label: periods?.[0]?.label,
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

const latestTomDate = (rader: Period[][]) =>
  rader.flat().reduce(latestDate, new Date(0));

export const useLatestDate = ({ endDate, rows }: any) =>
  useMemo(
    () => (endDate ? endDate : addDays(latestTomDate(rows), 1)),
    [endDate, rows]
  );
