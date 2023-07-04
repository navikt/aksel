import { Checkbox } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Checkbox hideLabel value="Midterst">
      Midterst
    </Checkbox>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
