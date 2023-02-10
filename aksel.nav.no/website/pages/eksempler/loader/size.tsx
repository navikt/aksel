import { Loader } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="grid place-items-center gap-4">
      <Loader size="3xlarge" title="venter..." />
      <Loader size="2xlarge" title="venter..." />
      <Loader size="xlarge" title="venter..." />
      <Loader size="large" title="venter..." />
      <Loader size="medium" title="venter..." />
      <Loader size="small" title="venter..." />
      <Loader size="xsmall" title="venter..." />
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
