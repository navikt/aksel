import { Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box background="brand-blue-moderate" width="18rem">
      <VStack gap="space-48">
        <HStack gap="space-12" justify="center">
          <Placeholder text="center" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="space-12" justify="end">
          <Placeholder text="end" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="space-12" justify="start">
          <Placeholder text="start" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="space-12" justify="space-around">
          <Placeholder text="around" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="space-12" justify="space-between">
          <Placeholder text="between" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </HStack>
        <HStack gap="space-12" justify="space-evenly">
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
      background="brand-blue-strong"
      borderRadius="4"
      padding="space-8"
      style={{ color: "var(--ax-text-accent-contrast)" }}
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
