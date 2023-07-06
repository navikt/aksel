import { MonthPicker, useMonthpicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const { monthpickerProps, inputProps } = useMonthpicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Aug 23 2025"),
    defaultSelected: new Date("Aug 28 2020"),
    onMonthChange: console.log,
  });

  return (
    <MonthPicker {...monthpickerProps}>
      <MonthPicker.Input {...inputProps} label="Velg månede" readOnly />
    </MonthPicker>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
};
