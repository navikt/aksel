import { Bleed, BodyLong, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <DemoWrapper>
      <Bleed marginInline={{ xs: "8", md: "12", lg: "16" }} asChild>
        <Box padding="3" className="p" background="surface-alt-3-subtle">
          <HStack justify="center">
            <BodyLong>xs: 8, md: 12, lg: 16</BodyLong>
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
      paddingBlock="4"
      paddingInline={{ xs: "4", md: "8", lg: "12" }}
      borderRadius="large"
    >
      <Box background="surface-subtle" padding="4" borderRadius="medium">
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
  index: 1,
  desc: "Margin block/inline er begge reponsive, som lar deg endre negativ margin dynamiskt basert på brekkpunkter.",
};
