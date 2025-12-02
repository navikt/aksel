import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box
        padding="space-16"
        background="brand-beige-soft"
        borderColor="brand-beige"
        borderWidth="4"
      >
        Brand-beige
      </Box>
      <Box
        padding="space-16"
        background="info-soft"
        borderColor="info"
        borderWidth="4"
      >
        Info
      </Box>
      <Box
        padding="space-16"
        background="success-soft"
        borderColor="success"
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
