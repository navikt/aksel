import { Bleed, Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed marginInline="10" asChild reflectivePadding>
        <Box background="surface-alt-3-subtle">
          reflectivePadding lar innhold forbli der det ville vært uten Bleed
        </Box>
      </Bleed>
      <Bleed marginInline="10" asChild>
        <Box background="surface-alt-3-subtle">
          Bleed uten reflectivePadding
        </Box>
      </Bleed>
      <Box background="surface-alt-3-subtle">Uten Bleed</Box>
    </DemoWrapper>
  );
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box background="surface-alt-3" padding="5" borderRadius="large">
      <Box background="surface-subtle" padding="5" borderRadius="medium">
        <VStack gap="4">{children}</VStack>
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
  index: 4,
};
