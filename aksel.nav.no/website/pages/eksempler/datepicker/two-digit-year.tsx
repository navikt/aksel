import { Box, DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.info,
    allowTwoDigitYear: true,
  });

  return (
    <Box minHeight="24rem">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          {...inputProps}
          label="Velg dato"
          description="Format: dd.mm.åå"
        />
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
  index: 10,
  desc: "Propen `allowTwoDigitYear` gjør det mulig å skrive årstallet på 'yy'-format. Mulige årstall vil være 80 år bakover og 19 år framover. I 2025 tilsvarer det 1945-2044.",
};
