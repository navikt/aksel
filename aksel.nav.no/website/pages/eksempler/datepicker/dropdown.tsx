import { DatePicker } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <DatePicker.Standalone
      onSelect={console.log}
      dropdownCaption
      fromDate={new Date("1 Oct 2020")}
      toDate={new Date("1 Oct 2024")}
    />
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
