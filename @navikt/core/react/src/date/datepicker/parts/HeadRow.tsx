import React from "react";
import { addDays, Locale, startOfWeek } from "date-fns";
import { useDayPicker } from "react-day-picker";
import { Hide } from "../../../layout/responsive";

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/HeadRow
 */
export function HeadRow(): JSX.Element {
  const {
    classNames,
    styles,
    showWeekNumber,
    locale,
    formatters: { formatWeekdayName },
    labels: { labelWeekday },
  } = useDayPicker();

  const weekdays = getWeekdays(locale);

  return (
    <tr style={styles.head_row} className={classNames.head_row}>
      {showWeekNumber && (
        <Hide below="sm" asChild>
          <td style={styles.head_cell} className={classNames.head_cell}></td>
        </Hide>
      )}
      {weekdays.map((weekday, i) => (
        <th
          key={i}
          scope="col"
          className={classNames.head_cell}
          style={styles.head_cell}
          aria-label={labelWeekday(weekday, { locale })}
        >
          {formatWeekdayName(weekday, { locale })}
        </th>
      ))}
    </tr>
  );
}

/**
 * Generate a series of 7 days, starting from the week, to use for formatting
 * the weekday names (Monday, Tuesday, etc.).
 */
export function getWeekdays(locale?: Locale): Date[] {
  const start = startOfWeek(new Date(), { locale, weekStartsOn: 1 });

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = addDays(start, i);
    days.push(day);
  }
  return days;
}
