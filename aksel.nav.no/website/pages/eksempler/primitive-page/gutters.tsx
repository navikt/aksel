import { HStack, Heading, Page } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/website-modules/examples/__parts/Dekorator";
import { Content } from "../../../components/website-modules/examples/__parts/PageDemoContent";

const Example = () => {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <HStack gap="space-16">
        <Page.Block as="main" width="xl" gutters>
          <Content>
            <Heading level="1" size="large">
              Page.Block med gutter
            </Heading>
          </Content>
        </Page.Block>
        <Page.Block as="main" width="xl">
          <Content>
            <Heading level="1" size="large">
              Page.Block uten gutter
            </Heading>
          </Content>
        </Page.Block>
      </HStack>
      <Env />
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
  index: 2,
  title: "Gutters",
  desc: "Propen `gutters` på Page.Block setter responsive gutters (padding-inline).",
};
