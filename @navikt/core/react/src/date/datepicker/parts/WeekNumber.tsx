/* https://github.com/gpbl/react-day-picker/blob/7f78cd5/src/components/WeekNumber/WeekNumber.tsx#L21 */
import React from "react";
import { Button, useDayPicker } from "react-day-picker";
import { useI18n } from "../../../util/i18n/i18n.context";
import { getTranslations } from "../../utils";

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
  number: weekNumber,
  dates,
}: WeekNumberProps): JSX.Element {
  const {
    onWeekNumberClick,
    styles,
    classNames,
    locale: { code },
  } = useDayPicker();
  const translate = useI18n("DatePicker", getTranslations(code));

  if (!onWeekNumberClick) {
    return (
      <span
        className={classNames.weeknumber}
        style={styles.weeknumber}
        aria-label={translate("weekNumber", { week: weekNumber })}
      >
        {weekNumber}
      </span>
    );
  }

  return (
    <Button
      name="week-number"
      aria-label={translate("selectWeekNumber", { week: weekNumber })}
      className={classNames.weeknumber}
      style={styles.weeknumber}
      onClick={(event) => {
        onWeekNumberClick(weekNumber, dates, event);
      }}
    >
      {weekNumber}
    </Button>
  );
}

export default WeekNumber;
