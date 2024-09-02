import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Box, DatePicker, useDatepicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.info,
    allowTwoDigitYear: true,
  });

  return (
    <div className="min-h-96">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
      <Box paddingBlock="4 0">
        {selectedDay && format(selectedDay, "dd.MM.yyyy", { locale: nb })}
      </Box>
    </div>
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
  desc: "Prop 'allowTwoDigitYear' legger til støtte for 'yy'-format. Tilgjengelig year-range vil være 80 år bakover og 19 år framover. I 2024 tilsvarer det 1944-2043.",
};
