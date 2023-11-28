import { withDsExample } from "@/web/examples/withDsExample";
import { Box, VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <VStack gap="4">
      <Box
        background="surface-subtle"
        borderColor="border-alt-3"
        padding="4"
        borderWidth="2"
        borderRadius="xlarge"
      >
        border-radius
      </Box>
      <Box
        background="surface-subtle"
        borderColor="border-alt-3"
        padding="4"
        borderWidth="2"
        borderRadius="xlarge xlarge 0 0"
      >
        Fleksibel border-radius
      </Box>
      <Box
        background="surface-subtle"
        borderColor="border-alt-3"
        padding="4"
        borderWidth="2"
        borderRadius={{ md: "large" }}
      >
        Dynamisk border-radius
      </Box>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "'borderRadius' lar deg endre border-radius på Box basert på tokens. Du kan også enkelt endre border-radius basert på brekkpunkt.",
};
