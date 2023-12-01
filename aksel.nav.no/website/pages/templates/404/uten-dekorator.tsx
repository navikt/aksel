import {
  BodyShort,
  Box,
  HGrid,
  Heading,
  Link,
  List,
  Page,
} from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";

const Example = () => {
  return (
    <Page data-aksel-template="404-v1" footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
          <HGrid gap="12" columns={{ sm: 1, md: 2 }}>
            <div>
              <Heading level="1" size="large" spacing>
                Beklager, vi fant ikke siden
              </Heading>
              <BodyShort>
                Denne siden kan være slettet eller flyttet, eller det er en feil
                i lenken.
              </BodyShort>
              <List>
                <List.Item>Bruk gjerne søket eller menyen</List.Item>
                <List.Item>
                  <Link href="#">Gå til forsiden</Link>
                </List.Item>
              </List>
            </div>
          </HGrid>
        </Box>
      </Page.Block>
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

export const args = {
  index: 5,
  title: "Uten dekoratøren",
  desc: "404-malen kan også enkelt brukes på sider uten nav-dekoratøren.",
  sandbox: false,
};
