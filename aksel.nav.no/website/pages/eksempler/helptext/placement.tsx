import { HelpText, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <HelpText title="top" placement="top">
        placement = top
      </HelpText>
      <HelpText title="right" placement="right">
        placement = right
      </HelpText>
      <HelpText title="bottom" placement="bottom">
        placement = bottom
      </HelpText>
      <HelpText title="left" placement="left">
        placement = left
      </HelpText>
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
  index: 1,
};
