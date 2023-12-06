import { DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    defaultSelected: new Date("Aug 28 2020"),
    onDateChange: console.log,
  });

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input {...inputProps} label="Velg dato" readOnly />
    </DatePicker>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
};
