import { withDsExample } from "@/web/examples/withDsExample";
import { Loader } from "@navikt/ds-react";

const Example = () => {
  return <Loader size="3xlarge" title="Venter..." variant="interaction" />;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
