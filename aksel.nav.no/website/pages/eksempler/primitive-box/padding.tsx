import { withDsExample } from "@/web/examples/withDsExample";
import { Box, VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <VStack gap="4">
      <Box background="surface-neutral" padding="4">
        <Box background="surface-alt-3-subtle" padding="2">
          Statisk padding
        </Box>
      </Box>
      <Box background="surface-neutral" padding={{ xs: "2", md: "6" }}>
        <Box background="surface-alt-3-subtle" padding="2">
          Dynamisk padding
        </Box>
      </Box>
    </VStack>
  );
};

export default withDsExample(Example, {
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "'padding'-prop lar deg endre padding responsivt basert på brekkpunkt",
};
