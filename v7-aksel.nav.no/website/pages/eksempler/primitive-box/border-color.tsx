import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box
        padding="space-16"
        background="surface-alt-3-subtle"
        borderColor="border-alt-3"
        borderWidth="4"
      >
        Alt-3
      </Box>
      <Box
        padding="space-16"
        background="surface-info-subtle"
        borderColor="border-info"
        borderWidth="4"
      >
        Info
      </Box>
      <Box
        padding="space-16"
        background="surface-success-subtle"
        borderColor="border-success"
        borderWidth="4"
      >
        Success
      </Box>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Propen 'borderColor' lar deg endre border-color basert på tokens.",
};
