import { Box, HGrid } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box background="surface-alt-3-subtle">
      <HGrid gap={{ xs: "2", md: "8" }} columns={3}>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HGrid>
    </Box>
  );
};

const Placeholder = () => <Box background="surface-alt-3" height="15rem" />;

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
  index: 3,
  desc: "Med responsiv gap kan du dynamisk tilpasse spacing basert på brekkpunktene våre.",
};
