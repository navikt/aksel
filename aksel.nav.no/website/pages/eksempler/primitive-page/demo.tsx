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
    <Page footer={<Footer />}>
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
  index: 0,
  title: "Standard",
  desc: "`Page.Block` kan også brukes i header og footer for å sikre at innholdet er sentrert og har samme maksbredde som resten av innholdet.",
};
