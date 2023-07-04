import { CopyButton } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <CopyButton copyText="3.14" />;
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
