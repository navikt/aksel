import { Lookup, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16" align="center">
      <Lookup word="top" heading="top" placement="top">
        placement = top
      </Lookup>
      <Lookup word="right" heading="right" placement="right">
        placement = right
      </Lookup>
      <Lookup word="bottom" heading="bottom" placement="bottom">
        placement = bottom
      </Lookup>
      <Lookup word="left" heading="left" placement="left">
        placement = left
      </Lookup>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
