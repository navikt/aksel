import {
  BodyShort,
  Box,
  Heading,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
import { useEffect } from "react";

export default function Example() {
  useDekorator();

  return (
    <Page footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
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
                En teknisk feil på våre servere gjør at siden er utilgjengelig.
                Dette skyldes ikke noe du gjorde.
              </BodyShort>
              <BodyShort>Du kan prøve å</BodyShort>
              <List title="">
                <List.Item>
                  vente noen minutter og laste siden på nytt
                </List.Item>
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
            </div>

            <BodyShort size="small" textColor="subtle">
              Feil-id: 12345678-9123-4567-8912-345678912345
            </BodyShort>
          </VStack>
        </Box>
      </Page.Block>
      <Env />
    </Page>
  );
}

function Header() {
  return <div id="decorator-header" />;
}

function Footer() {
  return <div id="decorator-footer" />;
}

const MILJO_URL = "https://www.nav.no/dekoratoren";

function Env() {
  return (
    <div
      id="decorator-env"
      data-src={`${MILJO_URL}/env?context=privatperson`}
    />
  );
}

/**
 * OBS: Dette er ikke anbefalt metode for å laste dekoratør!
 * Se `nav-dekoratoren`-dokumentasjon for riktig implementasjon
 * @see https://github.com/navikt/nav-dekoratoren
 */
function useDekorator() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${MILJO_URL}/client.js`;
    script.async = true;
    document.body.appendChild(script);

    const styles = document.createElement("link");
    styles.href = `${MILJO_URL}/css/client.css`;
    styles.rel = "stylesheet";
    document.head.appendChild(styles);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(styles);
    };
  }, []);
}

export const args = {
  index: 4,
  title: "Med feil-id",
  desc: "Ved å legge til en feil-id kan man enklere feilsøke mot logger hvis man får skjermbilde av feilmelding fra bruker.",
  sandbox: false,
};
