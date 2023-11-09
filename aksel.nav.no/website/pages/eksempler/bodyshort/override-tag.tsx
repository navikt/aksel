import { withDsExample } from "@/web/examples/withDsExample";
import { BodyShort } from "@navikt/ds-react";

const Example = () => {
  return <BodyShort as="span">Dette er nå en span!</BodyShort>;
};

export default withDsExample(Example, { variant: "full" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 8,
};
