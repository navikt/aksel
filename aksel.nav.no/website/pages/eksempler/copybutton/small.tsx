import { CopyButton } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex items-center gap-2">
      <CopyButton size="small" copyText="3.14" />
      <CopyButton size="small" copyText="3.14" text="Kopier" />
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
