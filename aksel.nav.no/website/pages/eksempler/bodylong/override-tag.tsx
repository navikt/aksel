import { withDsExample } from "@/web/examples/withDsExample";
import { BodyLong } from "@navikt/ds-react";

const Example = () => {
  return <BodyLong as="span">Dette er nå en span!</BodyLong>;
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
};
