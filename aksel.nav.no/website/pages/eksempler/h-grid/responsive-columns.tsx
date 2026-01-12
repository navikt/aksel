import { Box, HGrid } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box background="neutral-moderate">
      <HGrid gap="space-24" columns={{ xs: 1, sm: 2, md: 4 }}>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HGrid>
    </Box>
  );
};

const Placeholder = () => <Box background="neutral-strong" height="15rem" />;

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "full",
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Med responsive kolonner kan du dynamisk tilpasse dem basert på brekkpunktene våre.",
};
