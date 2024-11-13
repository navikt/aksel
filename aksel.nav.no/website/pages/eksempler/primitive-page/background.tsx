import { Heading, Page } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import {
  Content,
  Env,
  Footer,
  Header,
  useDekorator,
} from "../../../components/website-modules/examples/__parts/Dekorator";

const Example = () => {
  useDekorator();

  return (
    <Page background="bg-subtle" footer={<Footer />}>
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
  index: 5,
  title: "Bakgrunn",
  desc: "Propen `background` lar deg velge mellom `default` og `subtle` bakgrunn.",
};
