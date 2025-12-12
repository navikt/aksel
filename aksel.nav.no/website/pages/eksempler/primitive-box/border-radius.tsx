import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box
        background="neutral-soft"
        borderColor="brand-blue"
        padding="space-16"
        borderWidth="2"
        borderRadius="12"
      >
        border-radius
      </Box>
      <Box
        background="neutral-soft"
        borderColor="brand-blue"
        padding="space-16"
        borderWidth="2"
        borderRadius="12 12 0 0"
      >
        Fleksibel border-radius
      </Box>
      <Box
        background="neutral-soft"
        borderColor="brand-blue"
        padding="space-16"
        borderWidth="2"
        borderRadius={{ md: "8" }}
      >
        Dynamisk border-radius
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
  index: 6,
  desc: "Propen 'borderRadius' lar deg sette border-radius basert på tokens. Du kan også enkelt endre border-radius basert på brekkpunkt.",
};
