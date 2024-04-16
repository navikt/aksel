import { useEffect } from "react";
import { TasklistIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  GuidePanel,
  HGrid,
  Heading,
  Page,
  VStack,
} from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

function Example() {
  useDekorator();

  return (
    <Page data-aksel-template="500-v2" footer={<Footer />}>
      <Header />
      <Page.Block as="main" width="xl" gutters></Page.Block>
      <VStack gap="8">
        <Page.Block as="main" width="text" gutters>
          <HGrid gap="6" columns="3rem auto">
            <TasklistIcon height="3rem" width="3rem" />
            <VStack gap="1">
              <BodyShort size="small">
                NAV 10-07.03 (Om søknaden har ID)
              </BodyShort>
              <Heading level="1" size="large">
                Søknad om [ytelse]
              </Heading>
            </VStack>
          </HGrid>
        </Page.Block>
        <Page.Block width="text">
          <VStack gap="12">
            <GuidePanel poster>
              <VStack gap="4">
                <Heading level="3" size="medium">
                  Hei, [Navn Navnesen]!
                </Heading>
                <BodyShort>
                  Ingress fra nav.no (sjekk om API er en mulighet)
                  <br />
                  Link til produktsiden på nav.no.
                </BodyShort>
                <BodyShort>
                  Vi lagrer svarene i søknaden underveis, så du kan trygt ta
                  pauser og gå tilbake for å endre dem.
                </BodyShort>
              </VStack>
            </GuidePanel>
            <Box>
              <Heading level="2" size="large" spacing>
                Hva kan jeg søke på her? (om relevant)
              </Heading>
              <BodyLong spacing>
                Info om hva du kan søke på her, fordi det er ting du ikke kan
                søke på her. Som kan føre til at brukerne søker på feil ting.
              </BodyLong>
              <Heading level="3" size="medium" spacing>
                Hva kan jeg ikke søke på her? (om relevant)
              </Heading>
              <BodyLong>
                Info om hva du ikke kan søke på med denne søknaden, hva du
                heller må søke på + link til andre søknader.
              </BodyLong>
            </Box>
          </VStack>
        </Page.Block>
      </VStack>
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
export default withDsExample(Example);

export const Demo = {
  render: Example,
};
