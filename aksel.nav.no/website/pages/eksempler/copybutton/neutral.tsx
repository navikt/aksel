import { withDsExample } from "@/web/examples/withDsExample";
import { CopyButton } from "@navikt/ds-react";

const Example = () => {
  return <CopyButton copyText="3.14" />;
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
