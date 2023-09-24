/* https://github.com/gpbl/react-day-picker/blob/7f78cd5/src/components/WeekNumber/WeekNumber.tsx#L21 */
import React from "react";
import { Button, useDayPicker } from "react-day-picker";
import { labelWeekNumber, labelWeekNumberButton } from "../utils/labels";

export interface WeekNumberProps {
  /** The number of the week. */
  number: number;
  /** The dates in the week. */
  dates: Date[];
}

/**
 * Render the week number element. If `onWeekNumberClick` is passed to DayPicker, it
 * renders a button, otherwise a span element.
 */
export function WeekNumber(props: WeekNumberProps): JSX.Element {
  const { number: weekNumber, dates } = props;
  const {
    onWeekNumberClick,
    styles,
    classNames,
    locale: { code },
  } = useDayPicker();

  const weekLabel = labelWeekNumber({
    week: Number(weekNumber),
    localeCode: code,
  });

  if (!onWeekNumberClick) {
    return (
      <span
        className={classNames.weeknumber}
        style={styles.weeknumber}
        aria-label={weekLabel}
      >
        {weekNumber}
      </span>
    );
  }

  const label = labelWeekNumberButton({
    week: Number(weekNumber),
    localeCode: code,
  });

  const handleClick: React.MouseEventHandler = function (e) {
    onWeekNumberClick(weekNumber, dates, e);
  };

  return (
    <Button
      name="week-number"
      aria-label={label}
      className={classNames.weeknumber}
      style={styles.weeknumber}
      onClick={handleClick}
    >
      {weekNumber}
    </Button>
  );
}
