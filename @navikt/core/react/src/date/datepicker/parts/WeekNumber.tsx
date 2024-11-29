/* https://github.com/gpbl/react-day-picker/blob/7f78cd5/src/components/WeekNumber/WeekNumber.tsx#L21 */
import cl from "clsx";
import React from "react";
import { Button as RDPButton, useDayPicker } from "react-day-picker";
import { Button } from "../../../button";
import { UNSAFE_useAkselTheme } from "../../../provider";
import { labelWeekNumber, labelWeekNumberButton } from "../../utils/labels";

export interface WeekNumberProps {
  /** The number of the week. */
  number: number;
  /** The dates in the week. */
  dates: Date[];
  headerVersion?: boolean;
}

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/WeekNumber
 */
function WeekNumber(props: WeekNumberProps): JSX.Element {
  const themeContext = UNSAFE_useAkselTheme(false);
  const { number: weekNumber, dates } = props;
  const {
    onWeekNumberClick,
    styles,
    classNames,
    locale: { code },
  } = useDayPicker();

  const weekLabel = labelWeekNumber({
    week: Number(weekNumber),
    localeCode: code,
  });

  if (!onWeekNumberClick) {
    return (
      <span
        className={cl(classNames.weeknumber, "navds-date__weeknumber-number")}
        style={styles.weeknumber}
        aria-label={weekLabel}
      >
        {weekNumber}
      </span>
    );
  }

  const label = labelWeekNumberButton({
    week: Number(weekNumber),
    localeCode: code,
  });

  const handleClick: React.MouseEventHandler = function (e) {
    onWeekNumberClick(weekNumber, dates, e);
  };

  if (themeContext) {
    return (
      <Button
        variant="secondary-neutral"
        name="week-number"
        aria-label={label}
        style={styles.weeknumber}
        className="navds-date__weeknumber"
        onClick={handleClick}
        size="small"
        icon={
          <span className="navds-date__weeknumber-number">{weekNumber}</span>
        }
      />
    );
  }

  return (
    <RDPButton
      name="week-number"
      aria-label={label}
      style={styles.weeknumber}
      className={classNames.weeknumber}
      onClick={handleClick}
    >
      {weekNumber}
    </RDPButton>
  );
}

export default WeekNumber;
