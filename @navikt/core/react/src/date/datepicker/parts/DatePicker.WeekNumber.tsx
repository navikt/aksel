import React, { useMemo } from "react";
import { CalendarWeek, useDayPicker } from "react-day-picker";
import { Button } from "../../../button";
import { Hide, Show } from "../../../layout/responsive";
import { Detail } from "../../../typography";
import { cl } from "../../../utils/helpers";
import { useDateTranslationContext } from "../../Date.locale";
import { MultipleMode } from "../DatePicker.types";

const DatePickerWeekNumber = ({
  week: { weekNumber, days },
  onWeekNumberClick,
  className,
  style,
  showOnDesktop,
}: {
  week: CalendarWeek;
  onWeekNumberClick: MultipleMode["onWeekNumberClick"];
  showOnDesktop: boolean;
} & React.ThHTMLAttributes<HTMLTableCellElement>) => {
  const translate = useDateTranslationContext().translate;

  const { getModifiers } = useDayPicker();

  const hideWeek = useMemo(() => {
    if (
      days.filter((day) => {
        const mods = getModifiers(day);
        return !(mods.hidden || mods.outside || mods.disabled);
      }).length === 0
    ) {
      return true;
    }
    return false;
  }, [days, getModifiers]);

  const DisplayMode = showOnDesktop ? Show : Hide;

  if (!onWeekNumberClick || hideWeek) {
    return (
      <DisplayMode above="sm" asChild>
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
      </DisplayMode>
    );
  }

  return (
    <DisplayMode above="sm" asChild>
      <td
        className={cl("rdp-cell", {
          "aksel-date__week-wrapper": !showOnDesktop,
        })}
      >
        <Button
          variant="secondary-neutral"
          size="small"
          name="week-number"
          aria-label={translate("selectWeekNumber", { week: weekNumber })}
          style={style}
          className="aksel-date__weeknumber rdp-weeknumber"
          onClick={() => {
            onWeekNumberClick(
              weekNumber,
              days.map((day) => day.date),
            );
          }}
          icon={
            <span className="aksel-date__weeknumber-number">{weekNumber}</span>
          }
        />
      </td>
    </DisplayMode>
  );
};

export { DatePickerWeekNumber };
