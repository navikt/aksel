import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Box background="surface-subtle" padding="4" borderWidth="2">
        border-width
      </Box>
      <Box background="surface-subtle" padding="4" borderWidth="2 5">
        Fleksibel border-width
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
  index: 4,
  desc: "'borderWidth' gir deg kontroll over border på Box",
};
