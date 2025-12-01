import { Loader } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return <Loader size="3xlarge" title="Venter..." transparent />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

export const args = {
  index: 3,
  desc: "Prop-en `transparent` skjuler bakgrunnselementet på Loader.",
};
