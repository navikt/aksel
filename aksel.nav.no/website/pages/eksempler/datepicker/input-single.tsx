import { Box, DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.info,
  });

  return (
    <Box minHeight="24rem">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
      <Box paddingBlock="space-16 space-0">{selectedDay?.toDateString()}</Box>
    </Box>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Vi anbefaler å bruke `useDatepicker`-hooken hvis du har et input-felt.",
};
