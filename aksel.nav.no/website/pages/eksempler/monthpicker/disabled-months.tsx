import { MonthPicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const disabledDays = [
    new Date("May 10 2022"),
    { from: new Date("Nov 17 2022"), to: new Date("Feb 10 2023") },
  ];

  return (
    <MonthPicker.Standalone
      onMonthSelect={console.info}
      dropdownCaption
      fromDate={new Date("1 Oct 2020")}
      toDate={new Date("1 Oct 2024")}
      disabled={disabledDays}
    />
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
