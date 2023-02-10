import { BodyShort } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <BodyShort spacing>The red fox jumps over the lazy brown dog.</BodyShort>
      <BodyShort>The red fox jumps over the lazy brown dog.</BodyShort>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
