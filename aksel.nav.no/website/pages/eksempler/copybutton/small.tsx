import { CopyButton, HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="3">
      <CopyButton size="small" copyText="3.14" />
      <CopyButton size="small" copyText="3.14" text="Kopier" />
    </HStack>
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
