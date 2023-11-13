import { withDsExample } from "@/web/examples/withDsExample";
import { Label } from "@navikt/ds-react";

const Example = () => {
  return <Label as="span">Dette er nå en span!</Label>;
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
