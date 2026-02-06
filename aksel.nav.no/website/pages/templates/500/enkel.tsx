import {
  BodyShort,
  Box,
  HGrid,
  Heading,
  Link,
  List,
  Page,
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
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="space-80 space-64">
          <HGrid
            columns="minmax(auto,600px)"
            gap="space-16"
            data-aksel-template="500-v3"
          >
            <div>
              <BodyShort textColor="subtle" size="small">
                Statuskode 500
              </BodyShort>
              <Heading level="1" size="large">
                Beklager, noe gikk galt.
              </Heading>
            </div>
            {/* Tekster bør tilpasses den aktuelle 500-feilen. Teksten under er for en generisk 500-feil. */}
            <BodyShort>
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

export const args = {
  index: 1,
  title: "Enkel",
  desc: "I sin enkleste form skal 500-side inneholde en tittel, feilmelding, tilbakemeldingsfunksjon og løsningsforslag",
};
