import { Heading, Page } from "@navikt/ds-react";
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
    <Page footerPosition="belowFold" footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Content>
          <Heading level="1" size="large">
            Page.Block
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
  index: 1,
  title: "Footer belowFold",
  desc: "`footerPosition=belowFold` sikrer at footer aldri vil vises før man begynner å scrolle. Dette hjelper med å redusere layout-shifts ved navigering mellom sider.",
};
