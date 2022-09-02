import { Left, Right } from "@navikt/ds-icons";
import React from "react";
import { CaptionProps, useDayPicker, useNavigation } from "react-day-picker";
import { Button, Label } from "../..";

export const DatePickerCaption = ({ displayMonth, id }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    labels: { labelPrevious, labelNext },
    formatters: { formatCaption },
    locale,
  } = useDayPicker();

  if (!fromDate || !toDate) return <></>;

  const previousLabel = labelPrevious(previousMonth, { locale });
  const nextLabel = labelNext(nextMonth, { locale });

  return (
    <div className="navds-datepicker__caption">
      <Label
        as="span"
        aria-live="polite"
        aria-atomic="true"
        id={id}
        className="navds-datepicker__caption-label"
      >
        {formatCaption(displayMonth, { locale })}
      </Label>

      <div className="navds-datepicker__caption__month-wrapper">
        <Button
          aria-label={previousLabel}
          variant="tertiary"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<Left title="velg forrige månede" />}
          className="navds-datepicker__caption-button"
        />
        <Button
          aria-label={nextLabel}
          icon={<Right title="velg neste månede" />}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          variant="tertiary"
          className="navds-datepicker__caption-button"
        />
      </div>
    </div>
  );
};

export default DatePickerCaption;
