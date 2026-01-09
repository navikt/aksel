import { Bleed, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed marginInline="space-40" asChild>
        <Box padding="space-12" background="neutral-moderate">
          <HStack justify="center">marginInline</HStack>
        </Box>
      </Bleed>
    </DemoWrapper>
  );
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box background="neutral-strong" padding="space-20" borderRadius="8">
      <Box background="neutral-soft" padding="space-20" borderRadius="4">
        {children}
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
  index: 0,
};
