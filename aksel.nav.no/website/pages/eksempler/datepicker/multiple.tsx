import { UNSAFE_DatePicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_DatePicker.Standalone
      mode="multiple"
      min={1}
      max={3}
      onSelect={console.log}
    />
  );
};

export default withDsExample(Example);

export const args = {
  index: 5,
};
