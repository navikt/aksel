import { UNSAFE_DatePicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { isFriday } from "date-fns";

const Example = () => {
  const disabledDays = [
    new Date("Oct 10 2022"),
    { from: new Date("Oct 17 2022"), to: new Date("Nov 10 2022") },
    (date) => isFriday(date),
  ];

  return (
    <UNSAFE_DatePicker.Standalone
      today={new Date("Oct 9 2022")}
      disabled={disabledDays}
      onSelect={console.log}
    />
  );
};

export default withDsExample(Example);

export const args = {
  index: 2,
};
