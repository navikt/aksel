import { withDsExample } from "@/web/examples/withDsExample";
import { DatePicker } from "@navikt/ds-react";

const Example = () => {
  return <DatePicker.Standalone disableWeekends onSelect={console.log} />;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
