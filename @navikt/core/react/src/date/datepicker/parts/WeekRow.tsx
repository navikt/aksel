import React from "react";
import { CalendarWeek } from "react-day-picker";
import { Show } from "../../../layout/responsive";
import { Detail } from "../../../typography";
import { useId } from "../../../util/hooks";
import { useDateTranslationContext } from "../../context";
import { MultipleMode } from "../types";
import WeekNumber from "./WeekNumber";

const WeekRow = ({
  onWeekNumberClick,
  weeks,
}: {
  onWeekNumberClick: MultipleMode["onWeekNumberClick"];
  weeks?: CalendarWeek[];
}) => {
  const translate = useDateTranslationContext().translate;
  const labelId = useId();

  if (!onWeekNumberClick) {
    return null;
  }

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
                {translate("week")}
              </span>
            </Detail>

            {weeks?.map((week) => (
              <td
                key={week.weekNumber}
                className="rdp-cell navds-date__week-cell"
              >
                <span className="navds-date__week-wrapper">
                  <WeekNumber
                    week={week}
                    onWeekNumberClick={onWeekNumberClick}
                    showOnDesktop={false}
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
