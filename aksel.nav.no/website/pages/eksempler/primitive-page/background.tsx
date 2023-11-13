import { withDsExample } from "@/web/examples/withDsExample";
import { Box, Page } from "@navikt/ds-react";

const Example = () => {
  return (
    <Page
      background="bg-subtle"
      footer={
        <Box as="footer" background="surface-neutral-moderate" padding="8">
          <Page.Block gutters>Footer</Page.Block>
        </Box>
      }
    >
      <Box as="header" background="surface-neutral-moderate" padding="8">
        <Page.Block gutters>Header</Page.Block>
      </Box>
      <Box
        as="main"
        background="surface-alt-3-moderate"
        padding="8"
        paddingBlock="16"
      >
        <Page.Block gutters>Content</Page.Block>
      </Box>
    </Page>
  );
};

export default withDsExample(Example, {
  showBreakpoints: true,
  variant: "full",
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  title: "Bakgrunn",
  desc: "Background-prop lar deg velge mellom `default` og `subtle` bakgrunn.",
};
