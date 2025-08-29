import { Bleed, BodyLong, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed
        marginInline={{ xs: "space-32", sm: "space-48", md: "space-64" }}
        asChild
      >
        <Box padding="space-12" background="surface-alt-3-subtle">
          <HStack justify="center">
            <BodyLong>xs: 8, sm: 12, md: 16</BodyLong>
          </HStack>
        </Box>
      </Bleed>
    </DemoWrapper>
  );
};

function DemoWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      background="surface-alt-3"
      paddingBlock="space-16"
      paddingInline={{ xs: "space-16", sm: "space-32", md: "space-48" }}
      borderRadius="large"
    >
      <Box background="surface-subtle" padding="space-16" borderRadius="medium">
        {children}
      </Box>
    </Box>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "Både marginBlock og marginInline er reponsive, slik at du kan sette negativ margin dynamisk basert på brekkpunkter.",
};
