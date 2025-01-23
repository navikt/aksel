import { max, min, setMonth, setYear, startOfMonth } from "date-fns";
import React from "react";
import {
  CalendarMonth,
  CaptionProps,
  useDayPicker,
  useNavigation,
} from "react-day-picker";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { Select } from "../../../form/select";
import { useDateTranslationContext } from "../../context";
import { getMonths, getYears } from "../../utils";
import WeekRow from "./WeekRow";

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/CaptionDropdowns
 */
export const DropdownCaption = ({
  calendarMonth,
  displayIndex,
}: {
  /** The month where the grid is displayed. */
  calendarMonth: CalendarMonth;
  /** The index where this month is displayed. */
  displayIndex: number;
}) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    dayPickerProps: { startMonth, endMonth },
    formatters: { formatYearDropdown, formatCaption },
  } = useDayPicker();
  const translate = useDateTranslationContext().translate;

  if (!startMonth || !endMonth) {
    console.warn("Using dropdownCaption required fromDate and toDate");
    return <div />;
  }

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newMonth = setYear(
      startOfMonth(calendarMonth.date),
      Number(e.target.value),
    );
    goToMonth(startOfMonth(min([max([newMonth, startMonth]), endMonth])));
  };

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(
      setMonth(startOfMonth(calendarMonth.date), Number(e.target.value)),
    );

  const years = getYears(
    startMonth,
    endMonth,
    calendarMonth.date.getFullYear(),
  ).reverse();

  const months = getMonths(startMonth, endMonth, calendarMonth.date);

  return (
    <>
      <div className="navds-date__caption">
        <span
          aria-live="polite"
          aria-atomic="true"
          id={`caption-${displayIndex}`}
          className="navds-sr-only"
        >
          {formatCaption(calendarMonth.date)}
        </span>
        <Button
          variant="tertiary-neutral"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<ArrowLeftIcon title={translate("goToPreviousMonth")} />}
          className="navds-date__caption-button"
          type="button"
        />

        <div className="navds-date__caption">
          <Select
            label={translate("month")}
            hideLabel
            className="navds-date__caption__month"
            value={calendarMonth.date.getMonth()}
            onChange={handleMonthChange}
          >
            {months.map((m) => (
              <option key={m.getMonth()} value={m.getMonth()}>
                {formatCaption(m)}
              </option>
            ))}
          </Select>
          <Select
            label={translate("year")}
            hideLabel
            value={calendarMonth.date.getFullYear()}
            onChange={handleYearChange}
            className="navds-date__caption__year"
          >
            {years.map((year) => (
              <option key={year.getFullYear()} value={year.getFullYear()}>
                {formatYearDropdown(year)}
              </option>
            ))}
          </Select>
        </div>

        <Button
          variant="tertiary-neutral"
          icon={<ArrowRightIcon title={translate("goToNextMonth")} />}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className="navds-date__caption-button"
          type="button"
        />
      </div>
      <WeekRow displayMonth={calendarMonth.date} />
    </>
  );
};

export default DropdownCaption;
