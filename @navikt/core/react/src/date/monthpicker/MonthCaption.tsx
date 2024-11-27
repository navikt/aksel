import {
  isAfter,
  isBefore,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import React from "react";
import { useDayPicker } from "react-day-picker";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Select } from "../../form/select";
import { useI18n } from "../../util/i18n/i18n.context";
import { useSharedMonthContext } from "../context";
import { getTranslations } from "../utils";

export const MonthCaption = () => {
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption },
    locale,
  } = useDayPicker();
  const { hasDropdown, year, toYear } = useSharedMonthContext();
  const translate = useI18n("DatePicker", getTranslations(locale.code));

  const years: Date[] = [];

  if (hasDropdown && fromDate && toDate) {
    const fromYear = fromDate.getFullYear();
    const toDateYear = toDate.getFullYear();
    for (let currYear = fromYear; currYear <= toDateYear; currYear++) {
      years.push(setYear(startOfYear(new Date()), currYear));
    }

    if (!years.map((x) => x.getFullYear()).includes(year.getFullYear())) {
      years.push(setYear(startOfYear(new Date()), year.getFullYear()));
    }
    years.sort((a, b) => b.getFullYear() - a.getFullYear());
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    toYear(setYear(startOfMonth(new Date()), Number(event.target.value)));

  const handleButtonClick = (val: number) => {
    const newYear = Number(year.getFullYear() + val);
    toYear(setYear(year, newYear));
  };

  const disablePreviousYear = () => {
    return fromDate
      ? isBefore(year?.getFullYear() - 1, fromDate?.getFullYear())
      : false;
  };

  const disableNextYear = () => {
    return toDate
      ? isAfter(year?.getFullYear() + 1, toDate?.getFullYear())
      : false;
  };

  return (
    <div className="navds-date__caption">
      <Button
        className="navds-date__caption-button"
        disabled={disablePreviousYear()}
        onClick={() => handleButtonClick(-1)}
        icon={<ArrowLeftIcon title={translate("goToPreviousYear")} />}
        variant="tertiary"
        type="button"
      />

      {hasDropdown ? (
        <Select
          label={translate("year")}
          hideLabel
          value={year.getFullYear()}
          onChange={handleYearChange}
          className="navds-date__caption__year"
        >
          {years.map((yearOpt) => (
            <option key={yearOpt.getFullYear()} value={yearOpt.getFullYear()}>
              {formatYearCaption(yearOpt, { locale })}
            </option>
          ))}
        </Select>
      ) : (
        <span className="navds-date__year-label" aria-live="polite">
          {year.getFullYear()}
        </span>
      )}
      <Button
        className="navds-date__caption-button"
        disabled={disableNextYear()}
        onClick={() => handleButtonClick(1)}
        icon={<ArrowRightIcon title={translate("goToNextYear")} />}
        variant="tertiary"
        type="button"
      />
    </div>
  );
};

export default MonthCaption;
