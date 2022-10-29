import { UNSAFE_MonthPicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <UNSAFE_MonthPicker.Standalone
      onMonthSelect={console.log}
      dropdownCaption
      fromDate={new Date("1 Oct 2020")}
      toDate={new Date("1 Oct 2024")}
    />
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
