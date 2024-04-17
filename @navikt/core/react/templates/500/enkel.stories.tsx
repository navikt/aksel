import React from "react";
import {
  BodyShort,
  Box,
  HGrid,
  Heading,
  Link,
  List,
  Page,
} from "@navikt/ds-react";
import { Env, Footer, Header, useDekorator } from "../DemoDecorator";

export default {
  title: "templates/500/Enkel",
  parameters: {
    layout: "fullscreen",
  },
};

function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
          <HGrid columns="minmax(auto,600px)" data-aksel-template="500-v2">
            <BodyShort textColor="subtle" size="small">
              Statuskode 500
            </BodyShort>
            <Heading level="1" size="large" spacing>
              Beklager, noe gikk galt.
            </Heading>
            {/* Tekster bør tilpasses den aktuelle 500-feilen. Teksten under er for en generisk 500-feil. */}
            <BodyShort spacing>
              En teknisk feil på våre servere gjør at siden er utilgjengelig.
              Dette skyldes ikke noe du gjorde.
            </BodyShort>
            <BodyShort>Du kan prøve å</BodyShort>
            <List>
              <List.Item>
                vente noen minutter og{" "}
                {/* Husk at POST-data går tapt når man reloader med JS. For å unngå dette kan dere
                  fjerne lenken (men beholde teksten) slik at man må bruke nettleserens reload-knapp. */}
                <Link href="#" onClick={() => location.reload()}>
                  laste siden på nytt
                </Link>
              </List.Item>
              <List.Item>
                {/* Vurder å sjekke at window.history.length > 1 før dere rendrer dette som en lenke */}
                <Link href="#" onClick={() => history.back()}>
                  gå tilbake til forrige side
                </Link>
              </List.Item>
            </List>
            <BodyShort>
              Hvis problemet vedvarer, kan du{" "}
              {/* https://nav.no/kontaktoss for eksterne flater */}
              <Link href="#" target="_blank">
                kontakte oss (åpnes i ny fane)
              </Link>
              .
            </BodyShort>
          </HGrid>
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
}

export const Demo = {
  render: Example,
};
