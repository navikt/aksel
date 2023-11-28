import { withDsExample } from "@/web/examples/withDsExample";
import { Bleed, Box, VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed marginInline="10" asChild reflectivePadding>
        <Box className="p" background="surface-alt-3-subtle">
          reflectivePadding lar innhold forbli der det ville vært uten Bleed
        </Box>
      </Bleed>
      <Bleed marginInline="10" asChild>
        <Box className="p" background="surface-alt-3-subtle">
          Uten reflectivePadding
        </Box>
      </Bleed>
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
export default withDsExample(Example, {
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
