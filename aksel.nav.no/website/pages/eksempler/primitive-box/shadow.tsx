import { Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="8">
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="xsmall"
      >
        xsmall
      </Box>
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="small"
      >
        small
      </Box>
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="medium"
      >
        medium
      </Box>
      <Box
        background="surface-subtle"
        padding="4"
        borderRadius="large"
        shadow="large"
      >
        large
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
  index: 7,
  desc: "'shadow' lar deg endre box-shadow på Box basert på tokens.",
};
