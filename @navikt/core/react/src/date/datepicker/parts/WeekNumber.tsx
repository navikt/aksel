/* https://github.com/gpbl/react-day-picker/blob/7f78cd5/src/components/WeekNumber/WeekNumber.tsx#L21 */
import React from "react";
import { Button as RDPButton, useDayPicker } from "react-day-picker";
import { Button } from "../../../button";
import { UNSAFE_useAkselTheme } from "../../../provider";
import { Detail } from "../../../typography";
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
  const themeContext = UNSAFE_useAkselTheme(false);
  const translate = useI18n("DatePicker", getTranslations(code));

  if (!onWeekNumberClick) {
    return (
      <Detail
        as="span"
        textColor="subtle"
        className={classNames.weeknumber}
        style={styles.weeknumber}
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
        style={styles.weeknumber}
        className="navds-date__weeknumber"
        onClick={(event) => {
          onWeekNumberClick(weekNumber, dates, event);
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
      style={styles.weeknumber}
      className={classNames.weeknumber}
      onClick={(event) => {
        onWeekNumberClick(weekNumber, dates, event);
      }}
    >
      {weekNumber}
    </RDPButton>
  );
}

export default WeekNumber;
