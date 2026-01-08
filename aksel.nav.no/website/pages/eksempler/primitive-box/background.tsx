import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <Box padding="space-16" background="brand-beige-soft">
        Denne boksen har background=&quot;brand-beige-soft&quot;
      </Box>
      <Box padding="space-16" background="info-soft">
        Denne boksen har background=&quot;info-soft&quot;
      </Box>
      <Box padding="space-16" background="success-soft">
        Denne boksen har background=&quot;success-soft&quot;
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
  index: 0,
  desc: "Propen 'background' lar deg sette bakgrunnsfarge basert på tokens.",
};
