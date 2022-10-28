import { UNSAFE_MonthPicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <UNSAFE_MonthPicker.Standalone onMonthSelect={console.log} />;
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
