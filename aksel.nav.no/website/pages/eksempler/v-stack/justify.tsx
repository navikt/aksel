import { Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box
      style={{ display: "flex" }}
      height="18rem"
      background="surface-alt-3-subtle"
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
    background="surface-alt-3"
    borderRadius="medium"
    padding="space-8"
    style={{ color: "var(--a-text-on-action)" }}
  >
    {text}
  </Box>
);

const Divider = () => {
  return <Box borderWidth="0 1 0 0" borderColor="border-divider" />;
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
  index: 2,
  desc: "Endrer 'justify-content'.",
};
