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

function Example() {
  useDekorator();

  return (
    <Page data-aksel-template="500-v1" footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 8">
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
                En teknisk feil på våre servere gjør at siden er utilgjengelig.
                Dette skyldes ikke noe du gjorde.
              </BodyShort>
              <BodyShort>Du kan prøve å</BodyShort>
              <List>
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

            <div>
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
            </div>
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

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default Example;

export const args = {
  index: 5,
  title: "Flerspråk",
  desc: "Ved å legge til flere språk kan man være sikrere på at flere forstår hva som gikk feil.",
};
