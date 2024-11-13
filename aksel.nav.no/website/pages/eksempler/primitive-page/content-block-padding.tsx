import { Box, Page } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Page
      contentBlockPadding="end"
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
  index: 3,
  title: "Content Padding",
  desc: "Propen `contentBlockPadding` på Page sikrer at det alltid vil være en minimumspadding mellom innhold og footer. Dette vil være en god fallback, men mange layouts vil trenge ekstra padding top/bottom.",
};
