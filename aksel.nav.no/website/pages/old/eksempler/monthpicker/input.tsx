import { MonthPicker, useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const { monthpickerProps, inputProps, selectedMonth } = useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    onMonthChange: console.info,
  });

  return (
    <div className="min-h-96">
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input {...inputProps} label="Velg måned" />
      </MonthPicker>
      {selectedMonth && <div className="pt-4">{selectedMonth.getMonth()}</div>}
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
  index: 3,
  desc: "Vi anbefaler å bruke useMonthpicker-hook hvis man har et input-felt",
};
