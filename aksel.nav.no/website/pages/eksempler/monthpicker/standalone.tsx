import { withDsExample } from "@/web/examples/withDsExample";
import { MonthPicker } from "@navikt/ds-react";

const Example = () => {
  return <MonthPicker.Standalone onMonthSelect={console.log} />;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
