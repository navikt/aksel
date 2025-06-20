import { Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box background="surface-alt-3-subtle" width="18rem">
      <VStack gap="12">
        <HStack gap="3" justify="center">
          <Placeholder text="center" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="end">
          <Placeholder text="end" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="start">
          <Placeholder text="start" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="space-around">
          <Placeholder text="around" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="space-between">
          <Placeholder text="between" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="3" justify="space-evenly">
          <Placeholder text="evenly" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
      </VStack>
    </Box>
  );
};

const Placeholder = ({ text }: { text?: string }) => {
  return (
    <Box
      background="surface-alt-3"
      borderRadius="medium"
      padding="2"
      style={{ color: "var(--a-text-on-action)" }}
    >
      {text}
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
  index: 3,
  desc: "Endrer 'justify-content'.",
};
