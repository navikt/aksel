import React from "react";
import {
  BodyShort,
  Box,
  Button,
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
        <Box paddingBlock="20 16" data-aksel-template="404-v2">
          <VStack gap="12" align="start">
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
            <Button as="a" href="#">
              Gå til Min side
            </Button>
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
  index: 2,
  title: "Med CTA til side",
  desc: "En 404-side kan inneholde en CTA som leder til et relevant område eller side, avhengig av konteksten.",
};
