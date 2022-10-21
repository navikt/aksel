import { differenceInMilliseconds } from "date-fns";
import { Period, PositionedPeriod } from "./types.internal";

export const sisteDato = (a: Date, b: Date): number =>
  differenceInMilliseconds(a, b);

export const sistePeriode = (
  a: PositionedPeriod,
  b: PositionedPeriod
): number => a.horizontalPosition - b.horizontalPosition;

export const sisteEnklePeriode = (a: Period, b: Period): number =>
  differenceInMilliseconds(b.endInclusive, a.endInclusive);
