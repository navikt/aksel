import {
  BodyShort,
  Box,
  Heading,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
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
        <Box paddingBlock="space-80 space-64" data-aksel-template="404-v3">
          <VStack gap="space-64">
            <VStack gap="space-16">
              <Heading level="1" size="large">
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
            </VStack>

            <div>
              <Heading level="2" size="large" spacing>
                Page not found
              </Heading>
              <BodyShort spacing>
                The page you requested cannot be found.
              </BodyShort>
              <BodyShort>
                Go to the <Link href="#">front page</Link>, or use one of the
                links in the menu.
              </BodyShort>
            </div>
          </VStack>
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 4,
  title: "Flerspråk",
  desc: "En 404-feil kan være frustrerende, spesielt hvis den er på et ukjent språk. En melding på engelsk kan gjøre det lettere å forstå problemet og hva du skal gjøre videre",
};
