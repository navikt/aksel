import React from "react";
import { useDayPicker } from "react-day-picker";
import { Show } from "../../../layout/responsive";
import { Detail } from "../../../typography";
import { getMonthWeeks } from "../../utils/get-month-weeks";
import { labelWeek } from "../../utils/labels";
import WeekNumber from "./WeekNumber";
import { useId } from "../../../util";

const WeekRow = ({ displayMonth }: { displayMonth: Date }) => {
  const { locale, fixedWeeks, onWeekNumberClick } = useDayPicker();

  const labelId = useId();

  if (!onWeekNumberClick) {
    return null;
  }

  const weeks = getMonthWeeks(displayMonth, {
    useFixedWeeks: Boolean(fixedWeeks),
    locale,
  });

  return (
    <Show below="sm" asChild>
      <table className="rdp-table" role="grid">
        <tbody className="rdp-tbody">
          <tr className="rdp-row navds-date__week-row">
            <Detail
              as="th"
              weight="semibold"
              className="rdp-cell navds-date__week-cell"
            >
              <span className="navds-date__week-wrapper" id={labelId}>
                {labelWeek(locale?.code)}
              </span>
            </Detail>

            {weeks.map((week) => (
              <td
                key={week.weekNumber}
                className="rdp-cell navds-date__week-cell"
              >
                <span className="navds-date__week-wrapper">
                  <WeekNumber
                    number={week.weekNumber}
                    dates={week.dates}
                    headerVersion
                  />
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Show>
  );
};

export default WeekRow;
