import { Loader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Loader size="3xlarge" title="venter..." />;
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
