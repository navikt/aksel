import { withDsExample } from "@/web/examples/withDsExample";
import { Loader } from "@navikt/ds-react";

const Example = () => {
  return <Loader size="3xlarge" title="Venter..." variant="inverted" />;
};

export default withDsExample(Example, { variant: "inverted" });

export const args = {
  index: 2,
};
