import { Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box
      style={{ display: "flex" }}
      height="18rem"
      background="brand-blue-moderate"
    >
      <HStack gap="space-8" wrap={false}>
        <VStack justify="center" gap="space-4">
          <Placeholder text="center" />
          <Placeholder />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="end" gap="space-4">
          <Placeholder text="end" />
          <Placeholder />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="start" gap="space-4">
          <Placeholder text="start" />
          <Placeholder />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="space-around">
          <Placeholder text="around" />
          <Placeholder />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="space-between">
          <Placeholder text="between" />
          <Placeholder />
          <Placeholder />
        </VStack>
        <Divider />
        <VStack justify="space-evenly">
          <Placeholder text="evenly" />
          <Placeholder />
          <Placeholder />
        </VStack>
      </HStack>
    </Box>
  );
};

const Placeholder = ({ text }: { text?: string }) => (
  <Box
    background="brand-blue-strong"
    borderRadius="4"
    padding="space-8"
    style={{ color: "var(--ax-text-accent-contrast)" }}
  >
    {text}
  </Box>
);

const Divider = () => {
  return <Box borderWidth="0 1 0 0" borderColor="neutral-subtle" />;
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
  index: 2,
  desc: "Endrer 'justify-content'.",
};
