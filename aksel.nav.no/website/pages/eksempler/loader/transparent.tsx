import { Loader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Loader size="3xlarge" title="Venter..." transparent />;
};

export default withDsExample(Example);

export const args = {
  index: 3,
  desc: "Prop-en 'transparent' fjerner bakgrunnselementet på Loader.",
};
