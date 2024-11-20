import React from "react";
import { CaptionProps, useDayPicker, useNavigation } from "react-day-picker";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { Label } from "../../../typography";
import { useI18n } from "../../../util/i18n/i18n.context";
import { getTranslations } from "../../utils";
import WeekRow from "./WeekRow";

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/Caption
 */
export const DatePickerCaption = ({ displayMonth, id }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    formatters: { formatCaption },
    locale,
  } = useDayPicker();
  const translate = useI18n("DatePicker", getTranslations(locale.code));

  return (
    <>
      <div className="navds-date__caption">
        <Button
          variant="tertiary"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<ArrowLeftIcon title={translate("previousMonth")} />}
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
          icon={<ArrowRightIcon title={translate("nextMonth")} />}
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
