import React from "react";
import {
  BodyShort,
  Box,
  Heading,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
import { Env, Footer, Header, useDekorator } from "../DemoDecorator";

export default {
  title: "templates/404/Med lang en",
  parameters: {
    layout: "fullscreen",
  },
};

const Example = () => {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16" data-aksel-template="404-v2">
          <VStack gap="16">
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

export const Demo = {
  render: Example,
};
