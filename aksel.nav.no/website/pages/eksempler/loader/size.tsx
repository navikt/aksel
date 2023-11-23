import { withDsExample } from "@/web/examples/withDsExample";
import { HStack, Loader } from "@navikt/ds-react";

const Example = () => {
  return (
    <HStack gap="18">
      <Loader size="3xlarge" title="Venter..." />
      <Loader size="2xlarge" title="Venter..." />
      <Loader size="xlarge" title="Venter..." />
      <Loader size="large" title="Venter..." />
      <Loader size="medium" title="Venter..." />
      <Loader size="small" title="Venter..." />
      <Loader size="xsmall" title="Venter..." />
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
