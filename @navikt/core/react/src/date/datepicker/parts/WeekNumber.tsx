/* https://github.com/gpbl/react-day-picker/blob/7f78cd5/src/components/WeekNumber/WeekNumber.tsx#L21 */
import React from "react";
import { Button as RDPButton, useDayPicker } from "react-day-picker";
import { Button } from "../../../button";
import { useRenameCSS, useThemeInternal } from "../../../theme/Theme";
import { Detail } from "../../../typography";
import { useDateTranslationContext } from "../../context";

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
  const { onWeekNumberClick, styles, classNames } = useDayPicker();
  const themeContext = useThemeInternal(false);
  const translate = useDateTranslationContext().translate;
  const { cn } = useRenameCSS();

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
        className={cn("navds-date__weeknumber")}
        onClick={(event) => {
          onWeekNumberClick(weekNumber, dates, event);
        }}
        icon={
          <span className={cn("navds-date__weeknumber-number")}>
            {weekNumber}
          </span>
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
