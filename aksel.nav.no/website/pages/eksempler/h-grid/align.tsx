import { Box, HGrid, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-48">
      <HGrid gap="space-16" columns={2} align="start">
        <Placeholder height="10rem">Start</Placeholder>
        <Placeholder />
      </HGrid>
      <HGrid gap="space-16" columns={2} align="center">
        <Placeholder height="10rem">Center</Placeholder>
        <Placeholder />
      </HGrid>
      <HGrid gap="space-16" columns={2} align="end">
        <Placeholder height="10rem">End</Placeholder>
        <Placeholder />
      </HGrid>
    </VStack>
  );
};

const Placeholder = ({ height = "2rem", children = "" }) => (
  <Box
    height={height}
    background="surface-alt-3"
    style={{
      display: "grid",
      placeContent: "center",
      color: "var(--a-text-on-action)",
    }}
  >
    {children}
  </Box>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "full",
  showBreakpoints: true,
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "Endrer 'align-items' (vertikal justering).",
};
