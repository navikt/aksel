import { getUnixTime } from "date-fns";
import React from "react";
import { useDayPicker } from "react-day-picker";
import { Hide } from "../../../layout/responsive";
import DayButton from "./DayButton";
import WeekNumber from "./WeekNumber";

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

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/Row
 */
function Row(props: RowProps): JSX.Element {
  const { styles, classNames, showWeekNumber, components } = useDayPicker();

  const Day = components?.Day;

  if (!Day) {
    throw new Error("Day is undefined");
  }

  return (
    <tr className={classNames.row} style={styles.row}>
      {showWeekNumber && (
        <Hide below="sm" asChild>
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
        >
          <DayButton displayMonth={props.displayMonth} date={date} />
        </td>
      ))}
    </tr>
  );
}

export default Row;
