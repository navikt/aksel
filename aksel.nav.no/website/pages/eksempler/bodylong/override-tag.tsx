import { BodyLong } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <BodyLong as="span">Dette er nå en span!</BodyLong>;
};

export default withDsExample(Example, "static");

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
};
