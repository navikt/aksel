import { differenceInMilliseconds } from "date-fns";
import { Period, PositionedPeriod } from "./types.internal";

export const lastDate = (a: Date, b: Date): number =>
  differenceInMilliseconds(a, b);

export const lastPeriod = (a: PositionedPeriod, b: PositionedPeriod): number =>
  a.horizontalPosition - b.horizontalPosition;

export const lastSinglePeriod = (a: Period, b: Period): number =>
  differenceInMilliseconds(b.endInclusive, a.endInclusive);
