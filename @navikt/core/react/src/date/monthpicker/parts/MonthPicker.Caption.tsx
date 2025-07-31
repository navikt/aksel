import {
  format,
  isAfter,
  isBefore,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { Select } from "../../../form/select";
import { useRenameCSS } from "../../../theme/Theme";
import { useDateTranslationContext } from "../../Date.locale";
import { useMonthPickerContext } from "../MonthPicker.context";

const MonthPickerCaption = () => {
  const { fromDate, toDate, locale, year, onYearChange, caption } =
    useMonthPickerContext();

  const translate = useDateTranslationContext().translate;
  const { cn } = useRenameCSS();

  const years: Date[] = [];

  if (caption === "dropdown" && fromDate && toDate) {
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

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(setYear(startOfMonth(new Date()), Number(event.target.value)));
  };

  const handleButtonClick = (val: number) => {
    const newYear = Number(year.getFullYear() + val);

    onYearChange(setYear(year, newYear));
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
    <div className={cn("navds-date__caption")}>
      <Button
        className={cn("navds-date__caption-button")}
        disabled={disablePreviousYear()}
        onClick={() => handleButtonClick(-1)}
        icon={<ArrowLeftIcon title={translate("goToPreviousYear")} />}
        variant="tertiary-neutral"
        type="button"
      />

      {caption === "dropdown" ? (
        <Select
          label={translate("year")}
          hideLabel
          value={year.getFullYear()}
          onChange={handleYearChange}
          className={cn("navds-date__caption__year")}
        >
          {years.map((yearOpt) => (
            <option key={yearOpt.getFullYear()} value={yearOpt.getFullYear()}>
              {format(yearOpt, "yyyy", { locale })}
            </option>
          ))}
        </Select>
      ) : (
        <span className={cn("navds-date__year-label")} aria-live="polite">
          {year.getFullYear()}
        </span>
      )}
      <Button
        className={cn("navds-date__caption-button")}
        disabled={disableNextYear()}
        onClick={() => handleButtonClick(1)}
        icon={<ArrowRightIcon title={translate("goToNextYear")} />}
        variant="tertiary-neutral"
        type="button"
      />
    </div>
  );
};

export { MonthPickerCaption };
