import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Box background="surface-neutral" paddingInline="4">
        <Box background="surface-alt-3-subtle" padding="2">
          Padding inline
        </Box>
      </Box>
      <Box background="surface-neutral" paddingInline="4 16">
        <Box background="surface-alt-3-subtle" padding="2">
          Forskjellig inlineStart og inlineEnd
        </Box>
      </Box>
      <Box background="surface-neutral" paddingInline={{ xs: "4", md: "6 16" }}>
        <Box background="surface-alt-3-subtle" padding="2">
          Dynamisk paddingInline
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
  index: 2,
  desc: "Propen 'paddingInline' gir deg mer kontroll over horisontal padding.",
};
