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
import { withDsExample } from "@/web/examples/withDsExample";
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
      <Page.Block as="main" width="text" gutters>
        <Box paddingBlock="space-64 space-80" data-aksel-template="500-v4">
          <VStack gap="space-64">
            <VStack gap="space-48" align="start">
              <VStack gap="space-16">
                <div>
                  <BodyShort textColor="subtle" size="small">
                    Statuskode 500
                  </BodyShort>
                  <Heading level="1" size="large">
                    Beklager, noe gikk galt
                  </Heading>
                </div>
                <VStack gap="space-24">
                  {/* Tekster bør tilpasses den aktuelle 500-feilen. Teksten under er for en generisk 500-feil. */}
                  <BodyShort>
                    En teknisk feil på våre servere gjør at siden er
                    utilgjengelig. Dette skyldes ikke noe du gjorde.
                  </BodyShort>
                  <VStack gap="space-12">
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
                  </VStack>
                  <BodyShort>
                    Dersom problemet vedvarer, kan du{" "}
                    {/* https://nav.no/kontaktoss for eksterne flater */}
                    <Link href="#" target="_blank">
                      kontakte oss (åpnes i ny fane)
                    </Link>
                    .
                  </BodyShort>
                </VStack>
              </VStack>
              <BodyShort textColor="subtle">
                Feil-id: 12345678-9123-4567-8912-345678912345
              </BodyShort>
              <Button as="a" href="#">
                Gå til Min side
              </Button>
            </VStack>

            <div>
              <Heading level="2" size="large" spacing>
                Something went wrong
              </Heading>
              <BodyShort spacing>
                This was caused by a technical fault on our servers. Please
                refresh this page or try again in a few minutes.
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
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  theme: {
    forcedTheme: "light",
    switch: false,
  },
  variant: "fullscreen",
});

/* Storybook story */
export const Demo = {
  render: Example,
  parameters: { layout: "fullscreen" },
};

export const args: ExampleArgsT = {
  index: 0,
  title: "Komplett",
  desc: "I sin fullstendige form kan en 500-side inneholde feilkode, tittel, feilmelding, løsningsforslag, tilbakemeldingsfunksjon, feil-id, CTA og flere språk.",
};
