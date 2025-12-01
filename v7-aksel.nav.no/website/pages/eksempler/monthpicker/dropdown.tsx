import { MonthPicker } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const year = new Date().getFullYear();

const Example = () => {
  return (
    <MonthPicker.Standalone
      onMonthSelect={console.info}
      dropdownCaption
      fromDate={new Date(`1 Oct ${year - 2}`)}
      toDate={new Date(`1 Oct ${year + 2}`)}
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
