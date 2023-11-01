import { Loader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Loader size="3xlarge" title="Venter..." variant="inverted" />;
};

export default withDsExample(Example, { variant: "inverted" });

export const args = {
  index: 2,
};
