import { Detail } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Detail size="small">The red fox jumps over the lazy brown dog.</Detail>
  );
};

export default withDsExample(Example);

export const args = {
  index: 2,
};
