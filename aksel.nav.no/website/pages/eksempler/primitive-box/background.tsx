import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Box padding="4" background="surface-alt-3-subtle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        ipsum!
      </Box>
      <Box padding="4" background="surface-info-subtle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        ipsum!
      </Box>
      <Box padding="4" background="surface-success-subtle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
        ipsum!
      </Box>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "'Background'-prop lar deg endre farge basert på tilgjengelige tokens",
};
