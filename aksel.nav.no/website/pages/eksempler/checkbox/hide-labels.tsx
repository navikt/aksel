import { withDsExample } from "@/web/examples/withDsExample";
import { Checkbox } from "@navikt/ds-react";

const Example = () => {
  return (
    <Checkbox hideLabel value="Midterst">
      Midterst
    </Checkbox>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
