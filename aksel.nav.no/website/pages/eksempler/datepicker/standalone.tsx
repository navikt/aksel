import { UNSAFE_DatePicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <UNSAFE_DatePicker.Standalone onSelect={console.log} />;
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
