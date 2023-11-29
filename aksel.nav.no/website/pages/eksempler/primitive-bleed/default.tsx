import { withDsExample } from "@/web/examples/withDsExample";
import { Bleed, Box, HStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed marginInline="10" asChild>
        <Box padding="3" className="p" background="surface-alt-3-subtle">
          <HStack justify="center">marginInline</HStack>
        </Box>
      </Bleed>
    </DemoWrapper>
  );
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box background="surface-alt-3" padding="5" borderRadius="large">
      <Box background="surface-subtle" padding="5" borderRadius="medium">
        {children}
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
  index: 0,
};
