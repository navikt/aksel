import React from "react";
import { CalendarWeek } from "react-day-picker";
import { Show } from "../../../layout/responsive";
import { useRenameCSS } from "../../../theme/Theme";
import { Detail } from "../../../typography";
import { useId } from "../../../util/hooks";
import { useDateTranslationContext } from "../../Date.locale";
import { MultipleMode } from "../DatePicker.types";
import { DatePickerWeekNumber } from "./DatePicker.WeekNumber";

const DatePickerWeekRow = ({
  onWeekNumberClick,
  weeks,
}: {
  onWeekNumberClick: MultipleMode["onWeekNumberClick"];
  weeks?: CalendarWeek[];
}) => {
  const translate = useDateTranslationContext().translate;
  const { cn } = useRenameCSS();
  const labelId = useId();

  if (!onWeekNumberClick) {
    return null;
  }

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
                {translate("week")}
              </span>
            </Detail>

            {weeks?.map((week) => (
              <DatePickerWeekNumber
                key={week.weekNumber}
                week={week}
                onWeekNumberClick={onWeekNumberClick}
                showOnDesktop={false}
                className={cn("navds-date__week-wrapper")}
              />
            ))}
          </tr>
        </tbody>
      </table>
    </Show>
  );
};

export { DatePickerWeekRow };
