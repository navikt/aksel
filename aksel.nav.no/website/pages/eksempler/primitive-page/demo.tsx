import { Box, Page } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Page
      footer={
        <Box background="surface-neutral-moderate" padding="8" as="footer">
          <Page.Block gutters width="lg">
            Footer
          </Page.Block>
        </Box>
      }
    >
      <Box background="surface-neutral-moderate" padding="8" as="header">
        <Page.Block gutters width="lg">
          Header
        </Page.Block>
      </Box>
      <Box
        background="surface-alt-3-moderate"
        padding="8"
        paddingBlock="16"
        as="main"
      >
        <Page.Block gutters width="lg">
          Content
        </Page.Block>
      </Box>
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  showBreakpoints: true,
  variant: "fullscreen",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  title: "Standard",
};
