import { DatePicker, DatePickerProps, useDatepicker } from "@navikt/ds-react";

const DatePickerWrapper = ({
  fromDate,
  label,
}: DatePickerProps & { label: string }) => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate,
  });
  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input {...inputProps} label={label} />
    </DatePicker>
  );
};

export default DatePickerWrapper;
