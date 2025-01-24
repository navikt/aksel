import cl from "clsx";
import React from "react";
import { CalendarWeek } from "react-day-picker";
import { Button } from "../../../button";
import { Show } from "../../../layout/responsive";
import { Detail } from "../../../typography";
import { useDateTranslationContext } from "../../context";
import { MultipleMode } from "../types";

function WeekNumber({
  week: { weekNumber, days },
  onWeekNumberClick,
  className,
  style,
}: {
  week: CalendarWeek;
  onWeekNumberClick: MultipleMode["onWeekNumberClick"];
} & React.ThHTMLAttributes<HTMLTableCellElement>): JSX.Element {
  const translate = useDateTranslationContext().translate;

  if (!onWeekNumberClick) {
    return (
      <Show above="sm" asChild>
        <td className="rdp-cell">
          <Detail
            as="span"
            textColor="subtle"
            className={className}
            style={style}
            aria-label={translate("weekNumber", { week: weekNumber })}
          >
            {weekNumber}
          </Detail>
        </td>
      </Show>
    );
  }

  return (
    <Show above="sm" asChild>
      <td className="rdp-cell">
        <Button
          variant="secondary-neutral"
          size="small"
          name="week-number"
          aria-label={translate("selectWeekNumber", { week: weekNumber })}
          style={style}
          className={cl("navds-date__weeknumber", "rdp-weeknumber")}
          onClick={() => {
            onWeekNumberClick(
              weekNumber,
              days.map((day) => day.date),
            );
          }}
          icon={
            <span className="navds-date__weeknumber-number">{weekNumber}</span>
          }
        />
      </td>
    </Show>
  );
}

export default WeekNumber;
