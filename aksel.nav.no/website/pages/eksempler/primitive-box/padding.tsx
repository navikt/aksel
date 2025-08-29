import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box background="surface-neutral" padding="space-16">
        <Box background="surface-alt-3-subtle" padding="space-8">
          Statisk padding
        </Box>
      </Box>
      <Box
        background="surface-neutral"
        padding={{ xs: "space-8", md: "space-24" }}
      >
        <Box background="surface-alt-3-subtle" padding="space-8">
          Dynamisk padding
        </Box>
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
  legacyOnly: true,
};

export const args = {
  index: 1,
  desc: "Propen 'padding' lar deg sette padding responsivt basert på brekkpunkt. Verdien mapper til tokens, så f.eks. '4' tilsvarer '--a-spacing-4' som er '1rem'.",
};
