import { Box, HStack, Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import { Placeholder } from "../../../components/website-modules/examples/__parts/StackPlaceholder";

const Example = () => {
  return (
    <Box maxWidth="385px" padding="2" background="bg-subtle">
      <VStack gap="3">
        <div>
          <Heading size="xsmall">wrap=true (default)</Heading>
          <HStack gap="2 4">
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </HStack>
        </div>

        <div>
          <Heading size="xsmall">wrap=false</Heading>
          <HStack gap="2 4" wrap={false}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </HStack>
        </div>
      </VStack>
    </Box>
  );
};

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
  index: 1,
  desc: "Som standard er 'wrap' satt til 'true'.",
};
