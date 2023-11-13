import { withDsExample } from "@/web/examples/withDsExample";
import { Box, Page } from "@navikt/ds-react";

const Example = () => {
  return (
    <Page
      background="bg-subtle"
      footer={
        <Box as="footer" background="surface-neutral-moderate" padding="8">
          <Page.Block gutters width="2xl">
            Footer
          </Page.Block>
        </Box>
      }
    >
      <Box as="header" background="surface-neutral-moderate" padding="8">
        <Page.Block gutters width="2xl">
          Header
        </Page.Block>
      </Box>
      <Box
        as="main"
        background="surface-alt-3-moderate"
        padding="8"
        paddingBlock="16"
      >
        <Page.Block gutters width="2xl">
          Content
        </Page.Block>
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
  index: 6,
  title: "Maksbredde",
  desc: "Width-prop på Page.Block sentrerer innhold og legger på maksbredde. I de fleste løsninger bør 2xl (1440px) være standard.",
};
