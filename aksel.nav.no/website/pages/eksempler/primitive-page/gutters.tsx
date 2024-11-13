import { Heading, Page } from "@navikt/ds-react";
import { Content } from "@/web/examples/__parts/PageDemoContent";
import { withDsExample } from "@/web/examples/withDsExample";
import {
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/website-modules/examples/__parts/Dekorator";

const Example = () => {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Content>
          <Heading level="1" size="large" spacing>
            Page.Block med gutter
          </Heading>
        </Content>
      </Page.Block>
      <Page.Block as="main" width="xl">
        <Content>
          <Heading level="1" size="large" spacing>
            Page.Block uten gutter
          </Heading>
        </Content>
      </Page.Block>
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
