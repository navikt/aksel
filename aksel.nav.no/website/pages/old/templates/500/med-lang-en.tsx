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
        <Box paddingBlock="20 8">
          <HGrid columns="minmax(auto,600px)" data-aksel-template="500-v2">
            <VStack gap="16">
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

              <div>
                <Heading level="1" size="large" spacing>
                  Something went wrong
                </Heading>
                <BodyShort spacing>
                  This was caused by a technical fault on our servers. Please
                  refresh this page or try again in a few minutes.{" "}
                </BodyShort>
                <BodyShort>
                  {/* https://www.nav.no/kontaktoss/en for eksterne flater */}
                  <Link target="_blank" href="#">
                    Contact us (opens in new tab)
                  </Link>{" "}
                  if the problem persists.
                </BodyShort>
              </div>
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
  index: 5,
  title: "Flerspråk",
  desc: "Ved å legge til flere språk kan man være sikrere på at flere forstår hva som gikk feil.",
};
