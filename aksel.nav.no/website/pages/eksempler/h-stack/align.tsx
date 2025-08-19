import { Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-48">
      <HStack gap="space-12" align="center">
        <Placeholder text="center" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="space-12" align="end">
        <Placeholder text="end" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="space-12" align="start">
        <Placeholder text="start" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="space-12" align="stretch">
        <Placeholder text="stretch" />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HStack>
      <HStack gap="space-12" align="baseline">
        <Placeholder text="baseline" />
        <Placeholder text="text" padding="space-0" />
        <Placeholder text="text" padding="space-0 space-0 1rem" />
        <Placeholder text="text" padding="1rem space-0 space-0" />
        <Placeholder text="text" padding="space-0" />
      </HStack>
    </VStack>
  );
};

const Placeholder = ({
  text,
  padding = "0.5rem",
}: {
  text?: string;
  padding?: string;
}) => {
  return (
    <Box
      background="surface-alt-3"
      borderRadius="medium"
      minHeight="1rem"
      style={{ color: "var(--a-text-on-action)", padding }}
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
  index: 2,
  desc: "Endrer 'align-items'.",
};
