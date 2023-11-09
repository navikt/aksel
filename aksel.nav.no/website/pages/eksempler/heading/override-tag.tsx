import { withDsExample } from "@/web/examples/withDsExample";
import { Heading } from "@navikt/ds-react";

const Example = () => {
  return (
    <Heading size="medium" as="span">
      Dette er nå en span!
    </Heading>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
};
