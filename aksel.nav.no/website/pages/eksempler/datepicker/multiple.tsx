import { withDsExample } from "@/web/examples/withDsExample";
import { DatePicker } from "@navikt/ds-react";

const Example = () => {
  return (
    <DatePicker.Standalone
      mode="multiple"
      min={1}
      max={3}
      onSelect={console.log}
    />
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
