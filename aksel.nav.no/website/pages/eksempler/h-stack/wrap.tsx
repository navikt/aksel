import { Box, HStack, Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import { Placeholder } from "../../../components/website-modules/examples/__parts/StackPlaceholder";

const Example = () => {
  return (
    <Box maxWidth="385px" padding="space-8" background="neutral-moderate">
      <VStack gap="space-12">
        <div>
          <Heading size="xsmall">wrap=true (default)</Heading>
          <HStack gap="space-8 space-16">
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
          <HStack gap="space-8 space-16" wrap={false}>
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
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Som standard er 'wrap' satt til 'true'.",
};
