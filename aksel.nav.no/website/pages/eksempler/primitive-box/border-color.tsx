import { withDsExample } from "@/web/examples/withDsExample";
import { Box, VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <VStack gap="4">
      <Box
        background="surface-alt-3-subtle"
        borderColor="border-alt-3"
        padding="4"
        borderWidth="4"
      >
        Alt-3
      </Box>
      <Box
        background="surface-info-subtle"
        borderColor="border-info"
        padding="4"
        borderWidth="4"
      >
        Info
      </Box>
      <Box
        background="surface-success-subtle"
        borderColor="border-success"
        padding="4"
        borderWidth="4"
      >
        Success
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
  index: 5,
  desc: "'borderColor' lar deg endre border-color på Box basert på tokens",
};
