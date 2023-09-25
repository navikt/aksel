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
          aria-label={previousLabel}
          variant="tertiary"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<ArrowLeftIcon title="velg forrige måned" />}
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
          aria-label={nextLabel}
          icon={<ArrowRightIcon title="velg neste måned" />}
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
