import { Loader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Loader size="3xlarge" title="venter..." variant="inverted" />;
};

export default withDsExample(Example, "inverted");

export const args = {
  index: 2,
};
