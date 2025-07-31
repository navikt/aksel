import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Box padding="4" background="surface-alt-3-subtle">
        Denne boksen har background=&quot;surface-alt-3-subtle&quot;
      </Box>
      <Box padding="4" background="surface-info-subtle">
        Denne boksen har background=&quot;surface-info-subtle&quot;
      </Box>
      <Box padding="4" background="surface-success-subtle">
        Denne boksen har background=&quot;surface-success-subtle&quot;
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
  index: 0,
  desc: "Propen 'background' lar deg sette bakgrunnsfarge basert på tokens.",
};
