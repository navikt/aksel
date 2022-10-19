import { differenceInMilliseconds } from "date-fns";

export const position = (date: Date, start: Date, endInclusive: Date) => {
  const diff = differenceInMilliseconds(endInclusive, start);
  return (differenceInMilliseconds(date, start) / diff) * 100;
};

export const horizontalPositionAndWidth = (
  start: Date,
  endInclusive: Date,
  timelineStart: Date,
  timelineEndInclusive: Date
) => {
  const horizontalPosition = position(
    start,
    timelineStart,
    timelineEndInclusive
  );
  const width =
    position(endInclusive, timelineStart, timelineEndInclusive) -
    horizontalPosition;
  return {
    horizontalPosition: horizontalPosition,
    width: width,
  };
};
