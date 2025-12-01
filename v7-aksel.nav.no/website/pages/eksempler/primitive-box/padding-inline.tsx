import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box background="surface-neutral" paddingInline="space-16">
        <Box background="surface-alt-3-subtle" padding="space-8">
          Padding inline
        </Box>
      </Box>
      <Box background="surface-neutral" paddingInline="space-16 space-64">
        <Box background="surface-alt-3-subtle" padding="space-8">
          Forskjellig inlineStart og inlineEnd
        </Box>
      </Box>
      <Box
        background="surface-neutral"
        paddingInline={{ xs: "space-16", md: "space-24 space-64" }}
      >
        <Box background="surface-alt-3-subtle" padding="space-8">
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
