import { MonthPicker, VStack, useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { monthpickerProps, inputProps, selectedMonth } = useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    onMonthChange: console.info,
  });

  return (
    <VStack gap="space-16" minHeight="24rem">
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input {...inputProps} label="Velg måned" />
      </MonthPicker>
      {selectedMonth?.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
      })}
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Vi anbefaler å bruke `useMonthpicker`-hooken hvis du har et input-felt.",
};
