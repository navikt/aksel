import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Box background="surface-neutral" paddingBlock="4">
        <Box background="surface-alt-3-subtle" padding="2">
          Padding block
        </Box>
      </Box>
      <Box background="surface-neutral" paddingBlock="4 16">
        <Box background="surface-alt-3-subtle" padding="2">
          Forskjellig blockStart og blockEnd
        </Box>
      </Box>
      <Box background="surface-neutral" paddingBlock={{ xs: "4", md: "6 16" }}>
        <Box background="surface-alt-3-subtle" padding="2">
          Dynamisk paddingBlock
        </Box>
      </Box>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Propen 'paddingBlock' gir deg mer kontroll over vertikal padding.",
};
