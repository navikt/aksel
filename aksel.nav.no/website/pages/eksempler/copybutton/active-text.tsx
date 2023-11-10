import { withDsExample } from "@/web/examples/withDsExample";
import { CopyButton } from "@navikt/ds-react";

const Example = () => {
  return (
    <CopyButton copyText="3.14" text="Kopier XYZ" activeText="Kopierte XYZ" />
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
