import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box background="neutral-strong" padding="space-16">
        <Box background="brand-blue-moderate" padding="space-8">
          Statisk padding
        </Box>
      </Box>
      <Box
        background="neutral-strong"
        padding={{ xs: "space-8", md: "space-24" }}
      >
        <Box background="brand-blue-moderate" padding="space-8">
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
};

export const args = {
  index: 1,
  desc: "Propen 'padding' lar deg sette padding responsivt basert på brekkpunkt. Verdien mapper til tokens, så f.eks. 'space-4' tilsvarer '--ax-space-4' som er 0.25rem (4px).",
};
