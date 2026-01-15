import { Bleed, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed marginInline="space-40" asChild>
        <Box padding="space-12" background="surface-alt-3-subtle">
          <HStack justify="center">marginInline</HStack>
        </Box>
      </Bleed>
    </DemoWrapper>
  );
};

function DemoWrapper({ children }) {
  return (
    <Box background="surface-alt-3" padding="space-20" borderRadius="large">
      <Box background="surface-subtle" padding="space-20" borderRadius="medium">
        {children}
      </Box>
    </Box>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { legacyOnly: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
