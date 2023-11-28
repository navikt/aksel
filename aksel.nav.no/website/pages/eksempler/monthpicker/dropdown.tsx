import { withDsExample } from "@/web/examples/withDsExample";
import { MonthPicker } from "@navikt/ds-react";

const Example = () => {
  return (
    <MonthPicker.Standalone
      onMonthSelect={console.log}
      dropdownCaption
      fromDate={new Date("1 Oct 2020")}
      toDate={new Date("1 Oct 2024")}
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
  index: 0,
};
