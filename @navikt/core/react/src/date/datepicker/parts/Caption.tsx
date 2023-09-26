import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import React from "react";
import { CaptionProps, useDayPicker, useNavigation } from "react-day-picker";
import { Button, Label } from "../../..";
import WeekRow from "./WeekRow";

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/Caption
 */
export const DatePickerCaption = ({ displayMonth, id }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    labels: { labelPrevious, labelNext },
    formatters: { formatCaption },
    locale,
  } = useDayPicker();

  const previousLabel = labelPrevious(previousMonth, { locale });
  const nextLabel = labelNext(nextMonth, { locale });

  return (
    <>
      <div className="navds-date__caption">
        <Button
          variant="tertiary"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<ArrowLeftIcon title={previousLabel} />}
          className="navds-date__caption-button"
          type="button"
        />
        <Label
          as="span"
          aria-live="polite"
          aria-atomic="true"
          id={id}
          className="navds-date__caption-label"
        >
          {formatCaption(displayMonth, { locale })}
        </Label>
        <Button
          icon={<ArrowRightIcon title={nextLabel} />}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          variant="tertiary"
          className="navds-date__caption-button"
          type="button"
        />
      </div>
      <WeekRow displayMonth={displayMonth} />
    </>
  );
};

export default DatePickerCaption;
