import { withDsExample } from "@/web/examples/withDsExample";
import { Box, Page } from "@navikt/ds-react";

const Example = () => {
  return (
    <Page
      footer={
        <Page.Block gutters as="footer">
          <Box background="surface-neutral-moderate" padding="8">
            Footer
          </Box>
        </Page.Block>
      }
    >
      <Page.Block gutters as="header">
        <Box background="surface-neutral-moderate" padding="8">
          Header
        </Box>
      </Page.Block>
      <Page.Block gutters as="main">
        <Box background="surface-alt-3-moderate" paddingBlock="16" padding="8">
          Med gutter
        </Box>
      </Page.Block>
      <Page.Block as="main">
        <Box background="surface-alt-3-subtle" paddingBlock="16" padding="8">
          Uten gutter
        </Box>
      </Page.Block>
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  variant: "full",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  title: "Gutters",
  desc: "Gutters-prop på Page.Block setter responsive gutters (padding-inline)",
};
