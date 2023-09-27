import { MonthPicker, useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const { monthpickerProps, inputProps, selectedMonth } = useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    onMonthChange: console.log,
  });

  return (
    <div className="min-h-96">
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input {...inputProps} label="Velg månede" />
      </MonthPicker>
      {selectedMonth && <div className="pt-4">{selectedMonth.getMonth()}</div>}
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Vi anbefaler å bruke useMonthpicker-hook hvis man har et input-felt",
};
