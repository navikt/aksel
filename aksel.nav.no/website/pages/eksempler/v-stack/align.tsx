import { Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-48">
      <div>
        <VStack gap="space-12" align="center">
          <Placeholder text="center" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </VStack>
      </div>
      <div>
        <VStack gap="space-12" align="end">
          <Placeholder text="end" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </VStack>
      </div>
      <div>
        <VStack gap="space-12" align="start">
          <Placeholder text="start" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </VStack>
      </div>
      <div>
        <VStack gap="space-12" align="stretch">
          <Placeholder text="stretch" />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </VStack>
      </div>
      <div>
        <VStack gap="space-12" align="baseline">
          <Placeholder text="baseline" />
          <Placeholder text="text" padding="0" />
          <Placeholder text="text" padding="0" />
          <Placeholder text="text" padding="0" />
        </VStack>
      </div>
    </HStack>
  );
};

const Placeholder = ({
  text,
  padding = "0.5rem",
}: {
  text?: string;
  padding?: string;
}) => (
  <Box
    background="neutral-strong"
    borderRadius="4"
    style={{ color: "var(--ax-text-accent-contrast)", padding }}
  >
    {text}
  </Box>
);

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
  desc: "Endrer 'align-items'.",
};
