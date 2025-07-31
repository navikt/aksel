import { BodyLong, Page } from "@navikt/ds-react";
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
      <Page.Block as="main" width="text" gutters>
        <Content>
          <BodyLong>
            Vi anbefaler å bruke <code>width=&quot;text&quot;</code> på
            tekstblokker. Dette setter maksbredden til 576px + padding og skal
            gi en behagelig linjelengde.
          </BodyLong>
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
  index: 6,
  title: "Maksbredde",
  desc: "Propen `width` på Page.Block sentrerer innhold og legger på maksbredde.",
};
