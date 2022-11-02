import { UNSAFE_MonthPicker, UNSAFE_useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const { monthpickerProps, inputProps, selectedMonth } = UNSAFE_useMonthpicker(
    {
      fromDate: new Date("Aug 23 2019"),
      toDate: new Date("Aug 23 2025"),
      onMonthChange: console.log,
    }
  );

  return (
    <div className="min-h-96">
      <UNSAFE_MonthPicker {...monthpickerProps}>
        <div className="grid gap-4">
          <UNSAFE_MonthPicker.Input {...inputProps} label="Velg månede" />
        </div>
      </UNSAFE_MonthPicker>
      {selectedMonth && <div className="pt-4">{selectedMonth.getMonth()}</div>}
    </div>
  );
};

export default withDsExample(Example);

export const args = {
  index: 3,
  desc: "Vi anbefaler å bruke UNSAFE_useMonthpicker-hook hvis man har et input-felt",
};
