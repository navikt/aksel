import { Bleed, Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <DemoWrapper>
        <Bleed marginInline="space-40 space-0" asChild>
          <Box padding="space-12" background="surface-alt-3-subtle">
            <HStack justify="center">marginInline start</HStack>
          </Box>
        </Bleed>
      </DemoWrapper>
      <DemoWrapper>
        <Bleed marginInline="space-0 space-40" asChild>
          <Box padding="space-12" background="surface-alt-3-subtle">
            <HStack justify="center">marginInline end</HStack>
          </Box>
        </Bleed>
      </DemoWrapper>
      <DemoWrapper>
        <Bleed marginBlock="space-40 space-0" asChild>
          <Box padding="space-12" background="surface-alt-3-subtle">
            <HStack justify="center">marginBlock start</HStack>
          </Box>
        </Bleed>
      </DemoWrapper>
      <DemoWrapper>
        <Bleed marginBlock="space-0 space-40" asChild>
          <Box padding="space-12" background="surface-alt-3-subtle">
            <HStack justify="center">marginBlock end</HStack>
          </Box>
        </Bleed>
      </DemoWrapper>
    </VStack>
  );
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
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
  index: 2,
};
