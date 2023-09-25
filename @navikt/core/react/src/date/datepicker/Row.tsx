import React from "react";
import { getUnixTime } from "date-fns";
import { useDayPicker, Day } from "react-day-picker";
import { WeekNumber } from "./WeekNumber";
import { Hide } from "../../layout/responsive";

/**
 * The props for the {@link Row} component.
 */
export interface RowProps {
  /** The month where the row is displayed. */
  displayMonth: Date;
  /** The number of the week to render. */
  weekNumber: number;
  /** The days contained in the week. */
  dates: Date[];
}

/** Render a row in the calendar, with the days and the week number. */
export function Row(props: RowProps): JSX.Element {
  const { styles, classNames, showWeekNumber } = useDayPicker();

  return (
    <tr className={classNames.row} style={styles.row}>
      {showWeekNumber && (
        <Hide below="sm">
          <td className={classNames.cell} style={styles.cell}>
            <WeekNumber number={props.weekNumber} dates={props.dates} />
          </td>
        </Hide>
      )}
      {props.dates.map((date) => (
        <td
          className={classNames.cell}
          style={styles.cell}
          key={getUnixTime(date)}
          /* role="presentation" */
        >
          <Day displayMonth={props.displayMonth} date={date} />
        </td>
      ))}
    </tr>
  );
}
