import { Bleed, Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed marginInline="space-40" asChild reflectivePadding>
        <Box background="brand-blue-moderate">
          reflectivePadding lar innhold forbli der det ville vært uten Bleed
        </Box>
      </Bleed>
      <Bleed marginInline="space-40" asChild>
        <Box background="brand-blue-moderate">Bleed uten reflectivePadding</Box>
      </Bleed>
      <Box background="brand-blue-moderate">Uten Bleed</Box>
    </DemoWrapper>
  );
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box background="brand-blue-strong" padding="space-20" borderRadius="8">
      <Box background="neutral-soft" padding="space-20" borderRadius="4">
        <VStack gap="space-16">{children}</VStack>
      </Box>
    </Box>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
