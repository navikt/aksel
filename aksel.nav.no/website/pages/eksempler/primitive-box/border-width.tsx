import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box background="neutral-soft" padding="space-16" borderWidth="2">
        border-width
      </Box>
      <Box background="neutral-soft" padding="space-16" borderWidth="2 5">
        Fleksibel border-width
      </Box>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Propen 'borderWidth' gir deg kontroll over border.",
};
