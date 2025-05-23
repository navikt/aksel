import { Loader } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Loader size="3xlarge" title="Venter..." variant="inverted" />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { background: "inverted" });

export const args = {
  index: 2,
  desc: "Inverted-varianten passer bedre på mørkere flater.",
};
