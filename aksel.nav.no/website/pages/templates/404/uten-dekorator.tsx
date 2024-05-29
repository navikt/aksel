import { BodyShort, Box, Heading, Link, List, Page } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";

const Example = () => {
  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16" data-aksel-template="404-v2">
          <div>
            <Heading level="1" size="large" spacing>
              Beklager, vi fant ikke siden
            </Heading>
            <BodyShort>
              Denne siden kan være slettet eller flyttet, eller det er en feil i
              lenken.
            </BodyShort>
            <List>
              <List.Item>Bruk gjerne søket eller menyen</List.Item>
              <List.Item>
                <Link href="#">Gå til forsiden</Link>
              </List.Item>
            </List>
          </div>
        </Box>
      </Page.Block>
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen", chromatic: { disable: true } },
};

export const args = {
  index: 5,
  title: "Uten dekoratøren",
  desc: "404-malen kan også enkelt brukes på sider uten nav-dekoratøren.",
  sandbox: false,
};
