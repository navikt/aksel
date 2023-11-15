import { withDsExample } from "@/web/examples/withDsExample";
import { Detail } from "@navikt/ds-react";

const Example = () => {
  return <Detail as="span">Dette er nå en span!</Detail>;
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
