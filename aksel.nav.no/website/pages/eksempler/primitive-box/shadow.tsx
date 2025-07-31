import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="8">
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="xsmall"
      >
        xsmall
      </Box>
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="small"
      >
        small
      </Box>
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="medium"
      >
        medium
      </Box>
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="large"
      >
        large
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
