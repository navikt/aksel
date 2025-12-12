import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-32">
      <Box
        background="neutral-soft"
        padding="space-16"
        borderRadius="8"
        shadow="dialog"
      >
        dialog
      </Box>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  legacyOnly: true,
};

export const args = {
  index: 7,
  desc: "Propen 'shadow' lar deg sette box-shadow basert på tokens.",
};
