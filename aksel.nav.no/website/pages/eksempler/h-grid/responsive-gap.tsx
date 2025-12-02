import { Box, HGrid } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box background="brand-blue-moderate">
      <HGrid gap={{ xs: "space-8", md: "space-32" }} columns={3}>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </HGrid>
    </Box>
  );
};

const Placeholder = () => <Box background="brand-blue-strong" height="15rem" />;

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
  index: 3,
  desc: "Med responsiv gap kan du dynamisk tilpasse spacing basert på brekkpunktene våre.",
};
