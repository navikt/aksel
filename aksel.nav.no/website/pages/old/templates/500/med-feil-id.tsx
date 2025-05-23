import React from "react";
import {
  BodyShort,
  Box,
  HGrid,
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

function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
          <HGrid columns="minmax(auto,600px)" data-aksel-template="500-v2">
            <VStack gap="12" align="start">
              <div>
                <BodyShort textColor="subtle" size="small">
                  Statuskode 500
                </BodyShort>
                <Heading level="1" size="large" spacing>
                  Beklager, noe gikk galt.
                </Heading>
                {/* Tekster bør tilpasses den aktuelle 500-feilen. Teksten under er for en generisk 500-feil. */}
                <BodyShort spacing>
                  En teknisk feil på våre servere gjør at siden er
                  utilgjengelig. Dette skyldes ikke noe du gjorde.
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
              </div>

              <BodyShort size="small" textColor="subtle">
                Feil-id: 12345678-9123-4567-8912-345678912345
              </BodyShort>
            </VStack>
          </HGrid>
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args = {
  index: 4,
  title: "Med feil-id",
  desc: "Ved å legge til en feil-id kan man enklere feilsøke mot logger hvis man får skjermbilde av feilmelding fra bruker.",
};
