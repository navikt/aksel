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
    <Page contentBlockPadding="end" footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Content>
          <Heading level="1" size="large" spacing>
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
  index: 3,
  title: "Content Padding",
  desc: "Propen `contentBlockPadding` på Page sikrer at det alltid vil være en minimumspadding mellom innhold og footer. Dette vil være en god fallback, men mange layouts vil trenge ekstra padding top/bottom.",
};
