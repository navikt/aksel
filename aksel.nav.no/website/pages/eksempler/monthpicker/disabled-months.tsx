import { UNSAFE_MonthPicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const disabledDays = [
    new Date("May 10 2022"),
    { from: new Date("Nov 17 2022"), to: new Date("Feb 10 2023") },
  ];

  return (
    <UNSAFE_MonthPicker.Standalone
      onMonthSelect={console.log}
      dropdownCaption
      fromDate={new Date("1 Oct 2020")}
      toDate={new Date("1 Oct 2024")}
      disabled={disabledDays}
    />
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
