import Footer from "@/layout/footer/Footer";
import {
  BodyShort,
  Box,
  Button,
  Heading,
  Link,
  List,
  Page,
} from "@navikt/ds-react";

export default function Example() {
  return (
    <Page footer={<Footer />}>
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 8">
          <Box>
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
            <List title="">
              <List.Item>vente noen minutter og laste siden på nytt</List.Item>
              <List.Item>gå tilbake til forrige side</List.Item>
            </List>
            <BodyShort>
              Hvis problemet vedvarer, kan du{" "}
              {/* https://nav.no/kontaktoss for eksterne flater */}
              <Link href="#" target="_blank">
                kontakte oss (åpnes i ny fane)
              </Link>
              .
            </BodyShort>

            <Box paddingBlock="8">
              <BodyShort size="small">Feil-id: ##### </BodyShort>
            </Box>

            <Box paddingBlock="12 16">
              <Button>Gå til Min side</Button>
            </Box>

            <Heading level="1" size="large" spacing>
              Something went wrong
            </Heading>
            <BodyShort>
              Please refresh this page or try again in a few minutes.{" "}
              {/* https://www.nav.no/kontaktoss/en for eksterne flater */}
              <Link target="_blank" href="#">
                Contact us (opens in new tab)
              </Link>{" "}
              if the problem persists.
            </BodyShort>
          </Box>
        </Box>
      </Page.Block>
    </Page>
  );
}

export const args = {
  index: 1,
  title: "Uten Dekoratør",
  desc: "Malen fungerer ved bruk av andre sidemaler, også da uten dekoratøren.",
  sandbox: false,
};
