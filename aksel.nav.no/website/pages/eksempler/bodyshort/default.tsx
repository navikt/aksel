import { BodyShort } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <BodyShort>The red fox jumps over the lazy brown dog.</BodyShort>;
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
