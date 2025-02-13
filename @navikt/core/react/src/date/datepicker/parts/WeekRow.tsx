import React from "react";
import { useDayPicker } from "react-day-picker";
import { Show } from "../../../layout/responsive";
import { useRenameCSS } from "../../../theme/Theme";
import { Detail } from "../../../typography";
import { useId } from "../../../util/hooks";
import { useDateTranslationContext } from "../../context";
import { getMonthWeeks } from "../../utils/get-month-weeks";
import WeekNumber from "./WeekNumber";

const WeekRow = ({ displayMonth }: { displayMonth: Date }) => {
  const { locale, fixedWeeks, onWeekNumberClick } = useDayPicker();
  const translate = useDateTranslationContext().translate;
  const { cn } = useRenameCSS();
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
          <tr className={cn("rdp-row navds-date__week-row")}>
            <Detail
              as="th"
              weight="semibold"
              className={cn("rdp-cell navds-date__week-cell")}
            >
              <span className={cn("navds-date__week-wrapper")} id={labelId}>
                {`${translate("week")}:`}
              </span>
            </Detail>

            {weeks.map((week) => (
              <td
                key={week.weekNumber}
                className={cn("rdp-cell navds-date__week-cell")}
              >
                <span className={cn("navds-date__week-wrapper")}>
                  <WeekNumber number={week.weekNumber} dates={week.dates} />
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
