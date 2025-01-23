/* https://github.com/gpbl/react-day-picker/blob/7f78cd5/src/components/WeekNumber/WeekNumber.tsx#L21 */
import React from "react";
import {
  CalendarWeek,
  Button as RDPButton,
  useDayPicker,
} from "react-day-picker";
import { Button } from "../../../button";
import { useThemeInternal } from "../../../theme/Theme";
import { Detail } from "../../../typography";
import { useDateTranslationContext } from "../../context";
import { MultipleMode } from "../types";

export interface WeekNumberProps {
  /** The number of the week. */
  number: number;
  /** The dates in the week. */
  dates: Date[];
}

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/WeekNumber
 */
function WeekNumber({
  week: { weekNumber, days },
  onWeekNumberClick,
}: {
  week: CalendarWeek;
  onWeekNumberClick: MultipleMode["onWeekNumberClick"];
}): JSX.Element {
  const { styles, classNames } = useDayPicker();
  const themeContext = useThemeInternal(false);
  const translate = useDateTranslationContext().translate;

  if (!onWeekNumberClick) {
    return (
      <Detail
        as="span"
        textColor="subtle"
        className={classNames.week_number}
        style={styles?.week_number}
        aria-label={translate("weekNumber", { week: weekNumber })}
      >
        {weekNumber}
      </Detail>
    );
  }

  if (themeContext) {
    return (
      <Button
        variant="secondary-neutral"
        size="small"
        name="week-number"
        aria-label={translate("selectWeekNumber", { week: weekNumber })}
        style={styles?.week_number}
        className="navds-date__weeknumber"
        onClick={() => {
          onWeekNumberClick(weekNumber, days);
        }}
        icon={
          <span className="navds-date__weeknumber-number">{weekNumber}</span>
        }
      />
    );
  }

  return (
    <RDPButton
      name="week-number"
      aria-label={translate("selectWeekNumber", { week: weekNumber })}
      className={classNames.week_number}
      style={styles?.week_number}
      onClick={() => {
        onWeekNumberClick(weekNumber, days);
      }}
    >
      {weekNumber}
    </RDPButton>
  );
}

export default WeekNumber;
